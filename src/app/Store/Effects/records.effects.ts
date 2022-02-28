import {Injectable} from "@angular/core";
import {map, mergeMap, catchError, exhaustMap} from 'rxjs/operators';
import {of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecordService} from "../Service/record.service";
import {RecordsError, RecordsSuccess, WorldRecords} from "../Actions/records.actions";
@Injectable()
export class RecordEffects{
  loadRecords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorldRecords),
      exhaustMap(() =>
        this.recordService.GetAll().pipe(
          map(records => RecordsSuccess(records)),
          catchError(() => of({ type: RecordsError}))
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
