import {createSelector} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";

export const getAllUsers = createSelector(getRecordFeatureState, (state: State) => state.users.users);
export const getAllUsersByNationality = createSelector(getRecordFeatureState, (state: State) => state.users.users);
export const getUser = createSelector(getRecordFeatureState, (state: State) => state.users.user);
 // state.users.users.filter((user) => user.nationality.id. == id, state.records.records.filter(record => record.userID == user.id)));
