import {Injectable} from "@angular/core";
import {map, catchError, exhaustMap, tap} from 'rxjs/operators';
import {of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecordService} from "../Service/record.service";
import * as RecordActions from "../Actions/records.actions";
import * as UserActions from "../Actions/user.actions";
@Injectable()
export class RecordEffects{
  /*loadRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.LOAD_WORLDRECORDS),
      exhaustMap(() =>
        this.recordService.GetAllRecords().pipe(
          map(records => new RecordActions.Records_SuccessAction(records)),
          catchError((error) => of(new RecordActions.Record_FailAction(error)))
        )
      )
    )
  );*/
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
  PostRecord$ = createEffect(() => this.actions$.pipe(
    ofType(RecordActions.Add_Record),
    tap(action => console.log(action)),
    exhaustMap(action =>
      this.recordService.PostRecord(action.record).pipe(
        tap(record => console.log(record)),
        map(record => ({type: RecordActions.RECORD_SUCCESS, record: record})),
        catchError((error) => of({type: RecordActions.RECORD_FAIL, error: error}))
      ))
  ))
  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}

}
