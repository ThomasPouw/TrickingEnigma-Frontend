import {createSelector} from "@ngrx/store";
import {getRecordFeatureState, TrackRecord} from "../Reducers/records.reducer";
import {State} from "../Reducers";

export const getAllRecords = createSelector(getRecordFeatureState, (state: State) => state.trackRecords.trackRecords);
export const getUserRecord = createSelector(getRecordFeatureState, (state: State) => state.trackRecords.trackRecord);

