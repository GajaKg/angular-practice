import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { IUser, IUserLogin, IUserRegister } from "../models/User.interface";
import { AuthService } from "../services/auth/auth.service";
import { computed, DestroyRef, inject } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { Route } from "../app.routes";

type UserState = {
  user: IUser,
  isLoggedIn: boolean
};

const initialState: UserState = {
  user: {
    username: "",
    email: "",
    token: ""
  },
  isLoggedIn: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user, isLoggedIn }) => ({
    userToken: computed(() => user.token()),
    isAuthenticated: computed(() => isLoggedIn()),
  })),
  withMethods((
    store,
    authService$ = inject(AuthService),
    destroyRef = inject(DestroyRef),
    router = inject(Router)
  ) => ({
    register(newUser: IUserRegister) {
      authService$.registerUser(newUser).pipe(
        takeUntilDestroyed(destroyRef),
        tap((response: IUser) => {
          patchState(store, {
            user: response,
            isLoggedIn: true
          });

          localStorage.setItem("user", JSON.stringify(response));
        }),
        catchError((e: Error) => {
          // this.errorMessage = this.errorHandlerService.getErrorMessage(e);
          // this.cdr.markForCheck();
          console.log(e)
          return of();
        })
      ).subscribe();
    },
    login(user: IUserLogin) {
      authService$.loginUser(user).pipe(
        takeUntilDestroyed(destroyRef),
        tap((response: IUser) => {
          patchState(store, {
            isLoggedIn: true,
            user: response
          });

          localStorage.setItem("user", JSON.stringify(response));
          router.navigate([Route.Stockmarket]);
        }),
        catchError((e: Error) => {
          // this.errorMessage = this.errorHandlerService.getErrorMessage(e);
          // this.cdr.markForCheck();
          console.log(e)
          return of();
        })
      ).subscribe()
    },
    logout() {
      localStorage.removeItem("user");
      patchState(store, {
        isLoggedIn: false,
        user: {
          username: "",
          email: "",
          token: ""
        },
      });

      router.navigate([Route.Login]);
    },
    autoLogin() {
      const user = localStorage.getItem("user");

      if (user) {
        patchState(store, {
          isLoggedIn: true,
          user: JSON.parse(user)
        });
        router.navigate([Route.Stockmarket]);
        // alert("You are logedin!")
      }
    }
  }))
);
