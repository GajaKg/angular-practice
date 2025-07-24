import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HackernewsComponent } from './components/hackernews/hackernews.component';
import { authStockMarketGuard } from './auth-stock-market.guard';

export enum Route {
  Heroes = 'heroes',
  Hackernews = 'hackernews',
  AddExperince = 'addexperince',
  Login = 'login',
  Register = 'register',
  Portfolio = 'portfolio',
  Stockmarket = 'stockmarket',
}
export const routes: Routes = [
  {
    path: Route.Heroes,
    component: HeroesComponent
  },
  {
    path: Route.Hackernews,
    component: HackernewsComponent
  },
  {
    path: Route.AddExperince,
    loadComponent: () =>
      import('../app/components/add-experince/add-experince.component')
        .then(m => m.AddExperinceComponent)
  },
  {
    path: Route.Login,
    loadComponent: () =>
      import('../app/components/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: Route.Register,
    loadComponent: () =>
      import('../app/components/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: Route.Stockmarket,
    loadComponent: () =>
      import('../app/components/stockmarket/stockmarket/stockmarket.component')
        .then(m => m.StockmarketComponent),
    canActivate: [authStockMarketGuard],
    children: []
  },
];
