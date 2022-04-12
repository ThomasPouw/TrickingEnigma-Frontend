import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as LevelActions from "../Actions/level.actions";
import {catchError, exhaustMap, map} from "rxjs/operators";
import {of} from "rxjs";
import {RecordService} from "../Service/record.service";
import {LevelService} from "../Service/level.service";

@Injectable()
export class LevelEffects{
  loadLevel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LevelActions.LOAD_LEVEL),
      exhaustMap(() =>
        this.levelService.GetLevel().pipe(
          map(level => new LevelActions.Level_SuccessAction(level)),
          catchError((error) => of(new LevelActions.Level_FailAction(error)))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private levelService: LevelService
  ) {}
}
