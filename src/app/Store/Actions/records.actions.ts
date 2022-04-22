import {createAction, props} from "@ngrx/store";
import {Record} from "../Model/Record";

export const ADD_RECORD =             '[Record] Add Record';
export const LOAD_WORLDRECORDS =      '[Record] Load WorldRecords';
export const LOAD_USER_RECORD =       '[Record] Load User Record';
export const LOAD_USER_RECORDS =      '[Record] Load User Records';
export const LOAD_NATIONALRECORD =    '[Record] Load National Record';
export const LOAD_PUZZLERECORDS =     '[Record] Load Puzzle Record';
export const RECORD_SUCCESS =         '[Record] Record successfully delivered';
export const RECORDS_SUCCESS =        '[Record] Records successfully delivered';
export const RECORD_FAIL =            '[Record] Records/Record failed to deliver';

export const Add_Record= createAction(ADD_RECORD, props<{record: Record}>())
export const Load_WorldRecord= createAction(LOAD_WORLDRECORDS, props<{id: string}>())
export const Load_UserRecord= createAction(LOAD_USER_RECORD, props<{userID: string, levelID: string}>())
export const Load_All_UserRecords= createAction(LOAD_USER_RECORDS, props<{userID: string}>())
export const Load_PuzzleRecords= createAction(LOAD_PUZZLERECORDS, props<{id: string}>())
export const Load_NationalRecord = createAction(LOAD_PUZZLERECORDS, props<{levelID: string, nationalityID:string}>())
export const Record_Success = createAction(RECORD_SUCCESS, props<{record: Record | Record[]}>())
export const Record_Fail = createAction(RECORD_SUCCESS, props<{error: string}>())
