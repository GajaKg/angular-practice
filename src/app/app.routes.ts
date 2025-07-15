import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HackernewsComponent } from './components/hackernews/hackernews.component';

export enum Route {
  Heroes = 'heroes',
  Hackernews = 'hackernews',
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
];
