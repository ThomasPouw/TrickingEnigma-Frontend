import {Level} from "../Model/Level";
import * as level from "../Actions/level.actions";
import {Sprite} from "../Model/Sprite";
import {createFeatureSelector, createReducer, on} from "@ngrx/store";
import {State as AllState} from "./index";
import * as record from "../Actions/records.actions";

export interface State {
  levels: Level[];
  level: Level;
  error: any;
}
const initialState: State = {
  levels: [],
  level: {id: "", name: "", levelSprite: [], x_length: 0, y_length: 0},
  error: "",
};
export const reducer = createReducer(
  initialState,
  on(level.Level_Success, (state, action) => {
    if(action.level !== undefined){
      if(Array.isArray(action.level)){
        return {
          ...state,
          levels: action.level,
          error: ""
        }
      }

      return {
        ...state,
        level: action.level,
        error: ""
      }
    }
    return {...state};
  }),
  on(level.Level_Fail, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })

)
export const getLevels= (state: State) => state.levels;
export const getLevel= (state: State) => state.level;
export const getError= (state: State) => state.error;

export const getLevelFeatureState = createFeatureSelector<AllState>('reducer')
