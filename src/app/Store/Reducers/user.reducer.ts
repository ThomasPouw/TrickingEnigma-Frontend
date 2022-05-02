import {Level} from "../Model/Level";
import {User} from "../Model/User";
import {createFeatureSelector, createReducer, on} from "@ngrx/store";
import * as user from "../Actions/user.actions";
import {State as AllState} from "./index";

export interface State {
  users: User[];
  user?: User;
  error: any;
  id: string;
}
const initialState: State = {
  users: [],
  user: undefined,
  error: "",
  id: ""
};

export const reducer = createReducer(
  initialState,
  on(user.User_Success, (state, action) => {
    if(action.user !== undefined){
      if(Array.isArray(action.user)){
        return {
          ...state,
          users: action.user,
          error: ""
        }
      }

      return {
        ...state,
        user: action.user,
        error: ""
      }
    }
    return {...state};
  }),
  on(user.User_Fail, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
)

export const recordFeatureKey = 'Record';

export const getUsers= (state: State) => state.users;
export const getUser= (state: State) => state.user;
export const getError= (state: State) => state.error;

export const getUserFeatureState = createFeatureSelector<AllState>('reducer')
