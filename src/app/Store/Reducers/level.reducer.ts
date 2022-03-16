import {Level} from "../Model/Level";
import * as stage from "../Actions/level.actions";
import {Sprite} from "../Model/Sprite";
import {createFeatureSelector} from "@ngrx/store";
import {State as AllState} from "./index";

export interface State {
  levels: Level[];
  level: Level;
  error: any;
}
const initialState: State = {
  levels: [],
  level: {ID: "", StageName: "", Sprites: []},
  error: ""
};
export function reducer(state= initialState, action: stage.Actions): State {
  switch (action.type) {
    case stage.LOAD_LEVEL: {
      if(action.payload !== undefined) {
        let spritePayload: Sprite[] = [];
        action.payload.Sprites.forEach(function(value){
          spritePayload.push({X: value.X, Y: value.Y, assetLocation: value.assetLocation, side: value.side, collection: value.collection,})
        })
        if(spritePayload.length !== 0){
          return {
            ...state,
            level: {ID: action.payload.ID, StageName: action.payload.StageName, Sprites: spritePayload},
            error: ""
          }
        }
      }
      return state
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
