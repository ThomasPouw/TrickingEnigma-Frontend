import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as NationalityActions from "../Actions/nationality.actions";
import {NationalityService} from "../Service/nationality.service";
import {catchError, map, exhaustMap, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class NationalityEffects{
  //loadUserByID$ = createEffect(() => this.actions$.pipe(
  //     ofType(UserActions.Load_User),
  //     exhaustMap(action =>
  //     this.userService.GetUserByID(action.userID).pipe(
  //       map(user => ({type: UserActions.USER_SUCCESS, user: user})),
  //       catchError((error) => of({type: UserActions.USER_FAIL, error: error}))
  //     ))
  //   ))
  loadNationalityByID$ = createEffect(() => this.actions$.pipe(
    ofType(NationalityActions.Load_NationalityByID),
    exhaustMap(action =>
    this.nationalityService.GetNationalityByID(action.nationalityID).pipe(
      map(nationality => ({type: NationalityActions.NATIONALITY_SUCCESS, nationality: nationality})),
      catchError((error) => of({type: NationalityActions.NATIONALITY_FAIL, error: error}))
    ))
  ))
  loadAllNationalities$ = createEffect(() => this.actions$.pipe(
    ofType(NationalityActions.Load_All_Nationality),
    exhaustMap(() =>
      this.nationalityService.GetNationalities().pipe(
        map(nationality => ({type: NationalityActions.NATIONALITY_SUCCESS, nationality: nationality})),
        catchError((error) => of({type: NationalityActions.NATIONALITY_FAIL, error: error}))
      ))
  ))
  constructor(
    private actions$: Actions,
    private nationalityService: NationalityService
  ) {}
}
