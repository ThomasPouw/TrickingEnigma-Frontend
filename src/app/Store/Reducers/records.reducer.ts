import * as record from "../Actions/records.actions";

export interface TrackRecord{
  position?: number;
  courseName?: string;
  name: string;
  time: string;
  turns: number;
  nationality: string;
}
export interface State {
  trackRecords: TrackRecord[];
  trackRecord: TrackRecord | undefined;
  error: any;
}
const initialState: State = {
  trackRecords: [],
  trackRecord: undefined,
  error: ""
};

export function reducer(state= initialState, action: record.Actions): State {
  switch (action.type) {
    case record.LOAD_WORLDRECORDS: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
      }
    }
    case record.LOAD_USER_RECORD: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: [],
        trackRecord: action.payload,
        error: ""
      }
    }
    case record.LOAD_USER_RECORDS: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
      }
    }
    case record.LOAD_PUZZLERECORDS: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
      }
    }
    case record.LOAD_NATIONALRECORD: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
      }
    }
    case record.RECORDS_SUCCESS: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: action.payload,
        trackRecord: undefined,
        error: ""
      }
    }
    case record.RECORD_SUCCESS: {
      console.log(initialState)
      console.log(action.payload)
      console.log(state)
      return {
        ...state,
        trackRecords: [],
        trackRecord: action.payload,
        error: ""
      }
    }
    case record.RECORD_FAIL: {
      console.log(initialState);
      return {
        ...state,
        trackRecords: [],
        trackRecord: undefined,
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

export const getRecords= (state: State) => state;
