import {createSelector} from "@ngrx/store";
import {getRecordFeatureState, TrackRecord} from "../Reducers/records.reducer";
import {State} from "../Reducers";

export const getAllRecords = createSelector(getRecordFeatureState, (state: State) => test(state));
export const getUserRecord = createSelector(getRecordFeatureState, (state: State) => state.trackRecords.trackRecord);

function test(state: State): TrackRecord[]{
  console.log(state)
  return state.trackRecords.trackRecords
}
