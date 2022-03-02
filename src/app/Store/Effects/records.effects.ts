import {Injectable} from "@angular/core";
import {map, catchError, exhaustMap} from 'rxjs/operators';
import {of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecordService} from "../Service/record.service";
import * as RecordActions from "../Actions/records.actions";
@Injectable()
export class RecordEffects{
  loadRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.LOAD_WORLDRECORDS),
      exhaustMap(() =>
        this.recordService.GetAllRecords().pipe(
          map(records => new RecordActions.Record_SuccessAction(records)),
          catchError(() => of({ type: RecordActions.RECORD_FAIL}))
        )
      )
    )
  );
  loadUserRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.LOAD_USER_RECORD),
      exhaustMap(() =>
        this.recordService.GetUserRecord().pipe(
          map(record => new RecordActions.Record_SuccessAction(record)),
          catchError(() => of({ type: RecordActions.RECORD_FAIL}))
        )
      )
    )
  );
  loadUserRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.LOAD_USER_RECORDS),
      exhaustMap(() =>
        this.recordService.GetUserRecord().pipe(
          map(records => new RecordActions.Record_SuccessAction(records)),
          catchError(() => of({ type: RecordActions.RECORD_FAIL}))
        )
      )
    )
  );
  //ofType('[record Component] WorldRecords'),
  //       mergeMap(() => this.moviesService.getAll()
  //         .pipe(
  //           map(records => ({ type: '[record Component] Loaded Records Succesfully', payload: records })),
  //           catchError(() => of({ type: '[record Component] Movies Loaded Error' }))
  //         )
  //       )
  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}

}
