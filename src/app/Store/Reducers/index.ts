import * as fromRecords from './records.reducer'
import {ActionReducer, combineReducers, compose} from "@ngrx/store";
import { storeFreeze } from 'ngrx-store-freeze';
export interface State {
  trackRecords: fromRecords.State;
}
const reducers = {
  trackRecords: fromRecords.reducer,
};
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State, any> = combineReducers(reducers);

export function reducer(state: any, action: any) {
 // if (environment.production) {
    return productionReducer(state, action);
 // } else {
   //return developmentReducer(state, action);
  //}
}
