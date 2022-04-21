import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as LevelActions from "../Actions/level.actions";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {LevelService} from "../Service/level.service";

@Injectable()
export class LevelEffects{
  loadLevels$ = createEffect(() => this.actions$.pipe(
      ofType(LevelActions.Load_Level),
      exhaustMap(action =>

        this.levelService.GetLevels().pipe(
          map(levels => new LevelActions.Level_SuccessAction(levels)),
          catchError((error) => of(new LevelActions.Level_FailAction(error)))
        )
      )
    )
  );
  loadLevelByID$ = createEffect(() => this.actions$.pipe(
    ofType(LevelActions.Load_Level),
    exhaustMap(action =>

      this.levelService.GetLevelByID(action.id).pipe(
        map(levels => new LevelActions.Level_SuccessAction(levels)),
        catchError((error) => of(new LevelActions.Level_FailAction(error)))
      )
    )
  )

    //Observable<Action> = this.actions$.pipe(
  //     ofType(LevelActions.LOAD_LEVEL),
  //     debounceTime(300),
  //     exhaustMap(id => {
  //       console.log(id)
  //       if(id=== ""){
  //         return empty();
  //       }
  //       return this.levelService.GetLevelByID(id).pipe(map(level => new LevelActions.Level_SuccessAction(level)),
  //         catchError((error) => of(new LevelActions.Level_FailAction(error))))
  //     })
    /*switchMap(id => {
      console.log(id)
      if(id=== ""){
        return empty();
      }
      return this.levelService.GetLevelByID(id).pipe(map(level => new LevelActions.Level_SuccessAction(level)),
      catchError((error) => of(new LevelActions.Level_FailAction(error))))
    })*/
  )
  constructor(
    private actions$: Actions,
    private levelService: LevelService
  ) {}

//return this.levelService.GetLevelByID(id).map(level => new LevelActions.Level_SuccessAction(level)).catch((error) => of(new LevelActions.Level_FailAction(error))

}
