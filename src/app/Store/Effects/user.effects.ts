import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../Service/user.service";
import * as UserActions from "../Actions/user.actions";
import {of} from "rxjs";
import {map, catchError, exhaustMap, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

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
  loadUsersByID$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Load_Users),
    exhaustMap(action =>
      this.userService.GetUsersByID(action.userIDs).pipe(
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
  ))
  loadUsersByIDAndNationality$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Load_Users_By_Nationality),
    exhaustMap(action =>
      this.userService.GetUsersByIDAndNationalityID(action.userIDs, action.nationality_ID).pipe(
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
  ))
  loadUserBySecret$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Load_User_Login),
    exhaustMap(action =>
      this.userService.GetUserLogin(action.secret).pipe(
        tap(user => {if(user == undefined){this.router.navigate(['Login']);}
        else
        {
          if(user.id != undefined){
            sessionStorage.setItem("userID", user.id)
            this.router.navigate(['/User'])
          }
        }}),
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
  ))
  PostUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Add_User),
    exhaustMap(action =>
      this.userService.PostUser(action.user).pipe(
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
  ))
  EditUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.Edit_User),
    exhaustMap(action =>
      this.userService.EditUser(action.user).pipe(
        map(user => ({type: UserActions.USER_SUCCESS, user: user})),
        catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
      ))
  ))
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
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
