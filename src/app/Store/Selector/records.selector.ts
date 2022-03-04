import {createSelector} from "@ngrx/store";
import {getRecords, TrackRecord} from "../Reducers/records.reducer";
import {State} from "../Reducers";

export const getAllRecords =
  createSelector(getRecords, (state): TrackRecord[]=> {
    console.log(state)
      return state && state.trackRecords;
    }
  );
