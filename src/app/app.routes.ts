import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HackernewsComponent } from './components/hackernews/hackernews.component';

export enum Route {
  Heroes = 'heroes',
  Hackernews = 'hackernews',
  AddExperince = 'addexperince',
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
];
