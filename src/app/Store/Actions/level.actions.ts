import {Action, createAction, props} from "@ngrx/store";
import {Level} from "../Model/Level";



export const LOAD_LEVEL = "[Game Page] Load Level";
export const LOAD_LEVELS = "[Game Page] Load Level";
export const LEVEL_SUCCESS =    '[Game Page] Level successfully delivered';
export const Level_FAIL =     '[Game Page] Level failed to deliver';

export const Load_Level = createAction(LOAD_LEVEL, props<{id: string}>())
export class Load_LevelsAction implements Action {
  readonly type = LOAD_LEVELS;


  constructor(public payload: Level[]) {}
}
export class Load_LevelAction implements Action {
  readonly type = LOAD_LEVEL;


  constructor(public payload: string) {
  }
}
export class Level_SuccessAction implements Action {
  readonly type = LEVEL_SUCCESS;

  constructor(public payload: Level | Level[]) {}
}
export class Level_FailAction implements Action {
  readonly type = Level_FAIL;

  constructor(public payload: string) {}
}

export type Actions
  = Load_LevelAction|
  Load_LevelsAction |
  Level_SuccessAction|
  Level_FailAction
