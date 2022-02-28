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
      ofType(RecordActions.WorldRecords),
      exhaustMap(() =>
        this.recordService.GetAllRecords().pipe(
          map(records => RecordActions.RecordsSuccess(records)),
          catchError(() => of({ type: RecordActions.RecordsError}))
        )
      )
    )
  );
  loadUserRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.UserRecord),
      exhaustMap(() =>
        this.recordService.GetUserRecord().pipe(
          map(record => RecordActions.RecordsSuccess(record)),
          catchError(() => of({ type: RecordActions.RecordsError}))
        )
      )
    )
  );
  loadUserRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.UserRecords),
      exhaustMap(() =>
        this.recordService.GetUserRecord().pipe(
          map(record => RecordActions.RecordsSuccess(record)),
          catchError(() => of({ type: RecordActions.RecordsError}))
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
