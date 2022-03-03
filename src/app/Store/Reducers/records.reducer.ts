import {Action, createReducer, on} from "@ngrx/store";
import * as RecordAction from "../Actions/records.actions";
export interface TrackRecord{
  position?: number;
  courseName?: string;
  name: string;
  time: string;
  turns: number;
  nationality: string;
}
export interface State {
  trackRecords: TrackRecord[],
  trackRecord: TrackRecord | undefined
  error: any
}

export const initialState: State = {
  trackRecords: [],
  trackRecord: undefined,
  error: ""
};

export function reducer(state= initialState, action: RecordAction.Actions): State {
  switch (action.type) {
    case RecordAction.RECORDS_SUCCESS: {
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
        }
      }
    case RecordAction.RECORD_SUCCESS: {
      return {
        ...state,
        trackRecords: [],
        trackRecord: action.payload,
        error: ""
      }
    }
    case RecordAction.LOAD_WORLDRECORDS:{
      return <State>{
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        }
      }
    default:
      return state
    }
}
export const recordFeatureKey = 'record';

export const getRecords= (State: State) => State.trackRecords;
