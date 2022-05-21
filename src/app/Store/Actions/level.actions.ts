import {createAction, props} from "@ngrx/store";
import {Level} from "../Model/Level";



export const LOAD_LEVEL = "[Game Page] Load Level";
export const LOAD_LEVELS = "[Game Page] Load Level";
export const LEVEL_SUCCESS =    '[Game Page] Level successfully delivered';
export const LEVEL_FAIL =     '[Game Page] Level failed to deliver';

export const Load_Level = createAction(LOAD_LEVEL, props<{id: string}>())
export const Load_Levels = createAction(LOAD_LEVELS)
export const Level_Success = createAction(LEVEL_SUCCESS, props<{level: Level | Level[]}>())
export const Level_Fail = createAction(LEVEL_FAIL, props<{error: string}>())

