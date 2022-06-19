import * as record from "../Actions/records.actions";
import {createFeatureSelector, createReducer, on} from "@ngrx/store";
import {State as AllState} from "../Reducers"
import {Record} from "../Model/Record";
import * as level from "../Actions/level.actions";

export interface State {
  records: Record[];
  record: Record;
  error: any;
}
const initialState: State = {
  records: [],
  record: {recordCreated:0, time: 0, turns: 0, userID: "", levelID: ""},
  error: ""
};
export const reducer = createReducer(
  initialState,
  on(record.Record_Success, (state, action) => {
    if(action.record !== undefined){
      if(Array.isArray(action.record)){
        return {
          ...state,
          records: action.record,
          error: ""
        }
      }

      return {
        ...state,
        record: action.record,
        error: ""
      }
    }
    return {...state};
  }),
  on(record.Record_Fail, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
)
export const recordFeatureKey = 'Record';

export const getRecords= (state: State) => state.records;
export const getRecord= (state: State) => state.record;
export const getError= (state: State) => state.error;

export const getRecordFeatureState = createFeatureSelector<AllState>('reducer')
