import {Action} from "@ngrx/store";
import {Level} from "../Model/Level";



export const LOAD_LEVEL = "[Game Page] Load Level";
export const LEVEL_SUCCESS =    '[Game Page] Level successfully delivered';
export const Level_FAIL =     '[Game Page] Level failed to deliver';

export class Load_LevelAction implements Action {
  readonly type = LOAD_LEVEL;

  constructor(public payload: Level) {}
}
export class Level_SuccessAction implements Action {
  readonly type = LEVEL_SUCCESS;

  constructor(public payload: Level) {}
}
export class Level_FailAction implements Action {
  readonly type = Level_FAIL;

  constructor(public payload: string) {}
}

export type Actions
  = Load_LevelAction|
  Level_SuccessAction|
  Level_FailAction
