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
      if(action.payload !== undefined){
        let payload: TrackRecord[] = [];
        action.payload.forEach(function(value){
          payload.push({time: value.time, turns: value.turns, userName: value.time})
        })
        console.log(payload)
          return {
            ...state,
            trackRecords: payload,
            error: ""
        }

      }
      return {...state};
    }
    case record.LOAD_USER_RECORD: {
      console.log(state)
      console.log(action.payload)
      if(action.payload !== undefined) {
        return {
          ...state,
          trackRecord: {time: action.payload.time, turns: action.payload.turns, userName: action.payload.time},
          error: ""
        }
      }
      return state
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
      if(action.payload !== undefined){
        let payload: TrackRecord[] = [];
        action.payload.forEach(function(value){
          payload.push({time: value.time, turns: value.turns, userName: value.time})
        })
        return {
          ...state,
          trackRecords: payload,
          error: ""
        }

      }
      return {...state};
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
      console.log(state)
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
