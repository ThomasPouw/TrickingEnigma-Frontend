import {Injectable} from "@angular/core";
import {map, catchError, exhaustMap, tap} from 'rxjs/operators';
import {of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecordService} from "../Service/record.service";
import * as RecordActions from "../Actions/records.actions";
@Injectable()
export class RecordEffects{
  loadWorldRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.Load_WorldRecord),
      exhaustMap(action =>
        this.recordService.GetRecordsByLevel(action.id).pipe(
          map(records => ({ type: RecordActions.RECORD_SUCCESS, record: records })),
          catchError((error) => of({ type: RecordActions.RECORD_FAIL, error: error }))
        )
      )
    )
  );
  loadUserRecord$ = createEffect(() => this.actions$.pipe(
      ofType(RecordActions.Load_UserRecord),
      exhaustMap(action =>
        this.recordService.GetUserRecord(action.userID, action.levelID).pipe(
          map(records => ({ type: RecordActions.RECORD_SUCCESS, record: records })),
          catchError((error) => of({ type: RecordActions.RECORD_FAIL, error: error }))
        )
      )
    )
  )
  loadUserRecords$ = createEffect(() => this.actions$.pipe(
      ofType(RecordActions.Load_All_UserRecords),
      exhaustMap(action =>
        this.recordService.GetUserRecords(action.userID).pipe(
          map(records => ({ type: RecordActions.RECORD_SUCCESS, record: records })),
          catchError((error) => of({ type: RecordActions.RECORD_FAIL, error: error }))
        )
      )
    )
  )
  loadRecords$ = createEffect(() => this.actions$.pipe(
      ofType(RecordActions.Load_Records),
      exhaustMap(action =>
        this.recordService.GetRecords().pipe(
          map(records => ({ type: RecordActions.RECORD_SUCCESS, record: records })),
          catchError((error) => of({ type: RecordActions.RECORD_FAIL, error: error }))
        )
      )
    )
  )
  loadUserRecordsByNationality$ = createEffect(() => this.actions$.pipe(
      ofType(RecordActions.Load_NationalRecord),
      exhaustMap(action =>
        this.recordService.GetRecordsByNationality(action.levelID, action.nationalityID).pipe(
          map(records => ({ type: RecordActions.RECORD_SUCCESS, record: records })),
          catchError((error) => of({ type: RecordActions.RECORD_FAIL, error: error }))
        )
      )
    )
  )
  postRecord$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.Add_Record),
    tap(action => console.log(action)),
    exhaustMap(action =>
      this.recordService.PostRecord(action.record).pipe(
        map(record => ({type: RecordActions.RECORD_SUCCESS, record: record})), //({type: RecordActions.RECORD_SUCCESS, record: record})
        catchError((error) => of({type: RecordActions.RECORD_FAIL, error: error}))
      ))
  ))
  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}

}
