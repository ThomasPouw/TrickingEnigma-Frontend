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
          map(records => new RecordActions.Records_SuccessAction(records)),
          catchError((error) => of(new RecordActions.Record_FailAction(error)))
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
          catchError((error) => of(new RecordActions.Record_FailAction(error)))
        )
      )
    )
  );
  loadUserRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordActions.LOAD_USER_RECORDS),
      exhaustMap(() =>
        this.recordService.GetUserRecords().pipe(
          map(records => new RecordActions.Records_SuccessAction(records)),
          catchError((error) => of(new RecordActions.Record_FailAction(error)))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private recordService: RecordService
  ) {}

}
