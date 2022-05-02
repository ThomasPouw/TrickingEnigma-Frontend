import {createSelector} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";
import {Record} from "../Model/Record";

export const getAllRecords = createSelector(getRecordFeatureState, (state: State) => state.records.records);
export const getUserRecord = createSelector(getRecordFeatureState, (state: State) => state.records.record);
export const getLevelRecords = createSelector(getRecordFeatureState, (state: State) => state.records.records);
export const getRecordsByNationality = (id: string) => createSelector(getRecordFeatureState, (state:State) =>
   state.records.records.filter(record => state.users.users.filter(user => user.id === record.userID).filter(user => user.nationality.id == id)));
//export const RecordSortedByTime_Nationality = createSelector(getRecordsByNationality, (records: any) => records
