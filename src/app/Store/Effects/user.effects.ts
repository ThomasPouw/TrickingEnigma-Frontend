import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../Service/user.service";
import * as UserActions from "../Actions/user.actions";
import {of} from "rxjs";
import {map, catchError, exhaustMap, tap} from 'rxjs/operators';

@Injectable()
export class UserEffects{
  loadUserByID$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Load_User),
    exhaustMap(action =>
    this.userService.GetUserByID(action.userID).pipe(
      map(user => ({type: UserActions.USER_SUCCESS, user: user})),
      catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
    ))
  ))
  PostUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Add_User),
    exhaustMap(action =>
      this.userService.PostUser(action.user).pipe(
        tap(user => console.log(user)),
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
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