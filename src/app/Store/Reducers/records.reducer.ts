import {Action, createReducer, on} from "@ngrx/store";
import {
  NationalRecords,
  NewestRecords,
  RecordsError,
  RecordsSuccess,
  UserRecords,
  WorldRecords
} from "../Actions/records.actions";
export interface Record {
  position?: number;
  courseName?: string;
  name: string;
  time: string;
  turns: number;
  nationality: string;
}
export interface RecordState {
  records: Record[],
  record: Record
}

export const initialState: RecordState = {
  records: [],
  record: {name: "", time: "", nationality: "", turns: 0}
};
const _recordReducer = createReducer(
  initialState,
  on(NewestRecords, (state: any) => state),
  on(NationalRecords, (state: any) => state),
  on(WorldRecords, (state: any) => state),
  on(UserRecords, (state: any) => state),
  on(RecordsSuccess, (state: any) => state),
  on(RecordsError, (state: any) => state)
);


export function recordReducer(state: RecordState, action: Action) {
  return _recordReducer(state, action);
}
export const recordFeatureKey = 'record';
