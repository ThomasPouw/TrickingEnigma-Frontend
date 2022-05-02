import * as fromRecords from './records.reducer';
import * as fromLevels from './level.reducer';
import * as fromUsers from './user.reducer';
import * as fromNationalities from './nationality.reducer'
import {ActionReducer, combineReducers, compose} from "@ngrx/store";
import { storeFreeze } from 'ngrx-store-freeze';
export interface State {
  records: fromRecords.State;
  levels: fromLevels.State;
  users: fromUsers.State;
  nationalities: fromNationalities.State;
}
const reducers = {
  records: fromRecords.reducer,
  levels: fromLevels.reducer,
  users: fromUsers.reducer,
  nationalities: fromNationalities.reducer
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
