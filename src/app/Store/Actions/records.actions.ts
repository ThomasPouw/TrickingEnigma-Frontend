import {createAction, props} from "@ngrx/store";
import {Record} from "../Reducers/records.reducer";

export const NewestRecords = createAction('[record Component] NewestRecords');
export const WorldRecords = createAction('[record Component] WorldRecords');
export const NationalRecords = createAction(
  '[record Component] NationalRecords',
  props<{nationality: string}>()
);
export const UserRecords = createAction(
  '[record Component] UserRecords',
  props<{userID: string}>()
);
export const RecordsSuccess = createAction('[record Component] Loaded Records Succesfully',
  (records: any) => records);
//
export const RecordsError = createAction('[record Component] Loaded Records Error');
