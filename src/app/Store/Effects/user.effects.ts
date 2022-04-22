import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../Service/user.service";
import * as UserActions from "../Actions/user.actions";

@Injectable()
export class UserEffects{
  loadUserByID$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions)
  ))
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
//= createEffect(() => this.actions$.pipe(
//       ofType(LevelActions.Load_Level),
//       exhaustMap(action =>
//
//         this.levelService.GetLevels().pipe(
//           map(level =>  ({ type: LevelActions.LEVEL_SUCCESS, level: level })),
//           catchError((error) => of({type: LevelActions.LEVEL_FAIL, error: error}))
//         )
//       )
//     )
//   );
