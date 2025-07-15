import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './heroes.reducer';
import { Heroes } from '../models/Hero.interface';
export const selectHeroesState = createFeatureSelector<AppState>('heroes');
// export const selectAllHeroes = (state: AppState) => state.heroes;

export const selectAllHeroes = createSelector(
  selectHeroesState,
  (state: AppState) => state.heroes
);

// filtered heroes
export const selectVisibleHeroes = (searchLetter: string) => createSelector(
  selectAllHeroes,
  (heroes) => {
    if (!searchLetter) return heroes; // Return all if no search letter

    return heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchLetter.toLowerCase())
    );
  }
);
