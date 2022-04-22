import * as fromRecords from './records.reducer'
import * as fromLevels from './level.reducer'
import {ActionReducer, combineReducers, compose} from "@ngrx/store";
import { storeFreeze } from 'ngrx-store-freeze';
export interface State {
  records: fromRecords.State;
  levels: fromLevels.State;
}
const reducers = {
  records: fromRecords.reducer,
  levels: fromLevels.reducer
};
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
 // if (environment.production) {
    return productionReducer(state, action);
 // } else {
   //return developmentReducer(state, action);
  //}
}
