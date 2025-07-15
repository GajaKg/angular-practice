import { createReducer, on } from "@ngrx/store";
import { Heroes } from "../models/Hero.interface";
import { HeroesApiAction } from "./heroes.actions";

export interface AppState {
  heroes: Heroes[];
}


export const initialState: AppState = {
  heroes: [{ id: 1, name: "sd", images: {} }],
};

export const heroesReducer = createReducer(
  initialState,
  // on(HeroesApiAction.setAllHeroes, (_state, { heroes }) => heroes),
  // on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  // on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  on(HeroesApiAction.setAllHeroes, (state, { heroes }) => ({...state, heroes: [...heroes] }))
);
// Mouth of madness about to scream
// Link between good and evil
// Sacred nightmare, demonic dream
// I'm the key to the fable
