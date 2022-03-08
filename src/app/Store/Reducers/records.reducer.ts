import * as record from "../Actions/records.actions";
import {createFeatureSelector} from "@ngrx/store";
import {State as AllState} from "../Reducers"

export interface TrackRecord{
  position?: number;
  courseName?: string;
  userName: string;
  time: string;
  turns: number;
  nationality?: string;
}
export interface State {
  trackRecords: TrackRecord[];
  trackRecord: TrackRecord;
  error: any;
}
const initialState: State = {
  trackRecords: [],
  trackRecord: {userName: "",time: "", turns: 42},
  error: ""
};

export function reducer(state= initialState, action: record.Actions): State {
  switch (action.type) {
    case record.LOAD_WORLDRECORDS: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecords: action.payload,
        error: ""
      }
    }
    case record.LOAD_USER_RECORD: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecord: action.payload,
        error: ""
      }
    }
    case record.LOAD_USER_RECORDS: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecords: action.payload,
        error: ""
      }
    }
    case record.LOAD_PUZZLERECORDS: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecords: action.payload,
        error: ""
      }
    }
    case record.LOAD_NATIONALRECORD: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecords: action.payload,
        error: ""
      }
    }
    case record.RECORDS_SUCCESS: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecords: action.payload,
        error: ""
      }
    }
    case record.RECORD_SUCCESS: {
      console.log(state)
      console.log(action.payload)
      return {
        ...state,
        trackRecord: action.payload,
        error: ""
      }
    }
    case record.RECORD_FAIL: {
      console.log(initialState);
      return {
        ...state,
        trackRecords: [],
        trackRecord: {userName: "",time: "", turns: 42},
        error: action.payload,
      }
    }
    default: {
      return state;
    }
  }
  return state;
}
export const recordFeatureKey = 'TrackRecord';

export const getRecords= (state: State) => state.trackRecords;
export const getRecord= (state: State) => state.trackRecord;
export const getError= (state: State) => state.error;

export const getRecordFeatureState = createFeatureSelector<AllState>('reducer')
