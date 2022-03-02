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
  trackRecords: [],
  trackRecord: TrackRecord | undefined
}

export const initialState: State = {
  trackRecords: [],
  trackRecord: undefined
};

export function recordReducer(state = initialState, action: RecordAction.Actions) {
  switch (action.type) {
    case RecordAction.RECORD_SUCCESS: {
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        }
      }
    case RecordAction.LOAD_WORLDRECORDS:{
      return {
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
