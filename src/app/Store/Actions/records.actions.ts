import {Action} from "@ngrx/store";
import {TrackRecord} from "../Model/TrackRecord";

//export const ADD_RECORD =      '[Record] Add Record';
export const LOAD_WORLDRECORDS =      '[Record] Load WorldRecords';
export const LOAD_USER_RECORD =       '[Record] Load User Record';
export const LOAD_USER_RECORDS =       '[Record] Load User Records';
export const LOAD_NATIONALRECORD =    '[Record] Load National Record';
export const LOAD_PUZZLERECORDS =     '[Record] Load Puzzle Record';
export const RECORD_SUCCESS =    '[Record] Record successfully delivered';
export const RECORDS_SUCCESS =    '[Record] Records successfully delivered';
export const RECORD_FAIL =     '[Record] Records/Record failed to deliver';

export class Load_WorldRecordsAction implements Action {
  readonly type = LOAD_WORLDRECORDS;

  constructor(public payload: TrackRecord[]) { }
}

export class Load_User_RecordAction implements Action {
  readonly type = LOAD_USER_RECORD;

  constructor(public payload: TrackRecord) { }
}
export class Load_User_RecordsAction implements Action {
  readonly type = LOAD_USER_RECORDS;

  constructor(public payload: TrackRecord[]) { }
}

export class Load_NationalRecordAction implements Action {
  readonly type = LOAD_NATIONALRECORD;

  constructor(public payload: TrackRecord[]) { }
}

export class Load_PuzzleRecordAction implements Action {
  readonly type = LOAD_PUZZLERECORDS;
  constructor(public payload: TrackRecord[]) { }
}
export class Record_SuccessAction implements Action {
  readonly type = RECORD_SUCCESS;
  constructor(public payload: TrackRecord) { }
}
export class Records_SuccessAction implements Action {
  readonly type = RECORDS_SUCCESS;
  constructor(public payload: TrackRecord[]) { }
}
export class Record_FailAction implements Action {
  readonly type = RECORD_FAIL;
  constructor(public payload: string) { }
}
export type Actions
  = Load_NationalRecordAction
  | Load_User_RecordAction
  | Load_User_RecordsAction
  | Load_PuzzleRecordAction
  | Load_WorldRecordsAction
  | Record_FailAction
  | Record_SuccessAction
  | Records_SuccessAction;
