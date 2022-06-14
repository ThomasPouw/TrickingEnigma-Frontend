import {Nationality} from "../Model/Nationality";
import * as nationality from "../Actions/nationality.actions";
import {createFeatureSelector, createReducer, on} from "@ngrx/store";
import {State as AllState} from "./index";

export interface State {
  nationalities: Nationality[];
  nationality: Nationality;
  error: any;
  id: string;
}
const initialState: State = {
  nationalities: [],
  nationality: {id: "", name: ""},
  error: "",
  id: ""
};
export const reducer = createReducer(
  initialState,
  on(nationality.Nationality_Success, (state, action) => {
    if(action.nationality !== undefined){
      if(Array.isArray(action.nationality)){
        return {
          ...state,
          nationalities: action.nationality,
          error: ""
        }
      }

      return {
        ...state,
        nationality: action.nationality,
        error: ""
      }
    }
    return {...state}
  }),
  on(nationality.Nationality_Fail, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
);
export const getNationalities= (state: State) => state.nationalities;
export const getNationality= (state: State) => state.nationality;
export const getError= (state: State) => state.error;

export const getNationalityFeatureState = createFeatureSelector<AllState>('reducer')
