import { createAction, createActionGroup, props } from '@ngrx/store';
import { Heroes } from '../models/Hero.interface';

// export const allHeroes = createAction('[Heroes] All Heroes');
// export const homeScore = createAction('[Scoreboard Page] Home Score');
// export const awayScore = createAction('[Scoreboard Page] Away Score');
// export const resetScore = createAction('[Scoreboard Page] Score Reset');
// export const setScores = createAction('[Scoreboard Page] Set Scores', props<{game: Game}>());

export const HeroesApiAction = createActionGroup({
  source: 'HeroesApi',
  events: {
    'Set All Heroes': props<{ heroes: Heroes[] }>(),
    // 'Add Book': props<{ bookId: string }>(),
    // 'Remove Book': props<{ bookId: string }>(),
  },
});
