import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { UserStore } from '../store/user.store';
import { computed, inject, Signal } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  if (!req.withCredentials) return next(req);

  const userStore = inject(UserStore);
  const router = inject(Router);

  let authToken: string | undefined = userStore.userToken();

  if (!authToken) {
    authToken = localStorage.getItem("token") || "";
  }

  if (!authToken) return next(req).pipe(
    tap(re => {
      alert("Please login")
      router.navigate(['/login']);
    })
  );

  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
