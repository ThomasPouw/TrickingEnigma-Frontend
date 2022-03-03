import {createSelector} from "@ngrx/store";
import {getRecords, TrackRecord} from "../Reducers/records.reducer";

export const getAllRecords =
  createSelector(getRecords, (state: any): TrackRecord[] => {
      return state;
    }
  );
