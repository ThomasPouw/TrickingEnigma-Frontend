import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as LevelActions from "../Actions/level.actions";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {LevelService} from "../Service/level.service";
import * as RecordActions from "../Actions/records.actions";

@Injectable()
export class LevelEffects{
  loadLevels$ = createEffect(() => this.actions$.pipe(
      ofType(LevelActions.Load_Levels),
      exhaustMap(action =>

        this.levelService.GetLevels().pipe(
          map(level =>  ({ type: LevelActions.LEVEL_SUCCESS, level: level })),
          catchError((error) => of({type: LevelActions.LEVEL_FAIL, error: error}))
        )
      )
    )
  );
  loadLevelByID$ = createEffect(() => this.actions$.pipe(
      ofType(LevelActions.Load_Level),
      exhaustMap(action =>

        this.levelService.GetLevelByID(action.id).pipe(
          tap(level => console.log(level)),
          map(level =>  ({ type: LevelActions.LEVEL_SUCCESS, level: level })),
          catchError((error) => of({type: LevelActions.LEVEL_FAIL, error: error}))
        )
      )
    )
  );
  loadLevelsByID$ = createEffect(() => this.actions$.pipe(
      ofType(LevelActions.Load_Levels_By_IDs),
      exhaustMap(action =>

        this.levelService.GetLevelsByID(action.levelIDs).pipe(
          map(level =>  ({ type: LevelActions.LEVEL_SUCCESS, level: level })),
          catchError((error) => of({type: LevelActions.LEVEL_FAIL, error: error}))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private levelService: LevelService
  ) {}

//return this.levelService.GetLevelByID(id).map(level => new LevelActions.Level_SuccessAction(level)).catch((error) => of(new LevelActions.Level_FailAction(error))

}
