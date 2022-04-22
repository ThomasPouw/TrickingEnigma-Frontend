import {createSelector} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";

export const getAllRecords = createSelector(getRecordFeatureState, (state: State) => state.records.records);
export const getUserRecord = createSelector(getRecordFeatureState, (state: State) => state.records.record);

