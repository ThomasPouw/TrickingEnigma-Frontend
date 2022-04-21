import {Level} from "../Model/Level";
import * as stage from "../Actions/level.actions";
import {Sprite} from "../Model/Sprite";
import {createFeatureSelector} from "@ngrx/store";
import {State as AllState} from "./index";

export interface State {
  levels: Level[];
  level: Level;
  error: any;
  id: string;
}
const initialState: State = {
  levels: [],
  level: {iD: "", name: "", levelSprite: [], horizon_tile: 0, vertical_tile: 0},
  error: "",
  id: ""
};
export function reducer(state= initialState, action: stage.Actions): State {
  switch (action.type) {
    case stage.LOAD_LEVEL:
    {
      if(action.payload !== undefined && typeof action.payload == "string") {
        const id = action.payload;
        return {
          ...state,
          error: "",
          id
        }
      }
      return state
    }
    case stage.LOAD_LEVELS: {
      if(action.payload !== undefined) {
        return <State>{
          ...state,
          error: "",
          id: action.payload
        }
      }
      return state
    }
    case stage.LEVEL_SUCCESS:{
      if(action.payload !== undefined){
        if(Array.isArray(action.payload))
        return {
          ...state,
          levels: action.payload,
          error: ""
        }
        else
          return {
            ...state,
            level: action.payload,
            error: ""
          }
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
export const getLevels= (state: State) => state.levels;
export const getLevel= (state: State) => state.level;
export const getError= (state: State) => state.error;

export const getLevelFeatureState = createFeatureSelector<AllState>('reducer')
