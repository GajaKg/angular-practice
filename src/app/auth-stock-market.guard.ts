import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStore } from './store/user.store';

export const authStockMarketGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const isLoggedIn = computed(() => userStore.isLoggedIn());
  // console.log("isLoggedIn", isLoggedIn())
  // console.log("userToken localStorage", localStorage.getItem("token"))
  return isLoggedIn();
};
