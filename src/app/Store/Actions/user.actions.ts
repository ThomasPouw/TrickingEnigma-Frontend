import {createAction, props} from "@ngrx/store";
import {User} from "../Model/User";

export const LOAD_USER = "[User] Load User";
export const ADD_USER = "[User] Add new User";
export const USER_SUCCESS =    '[User] User successfully delivered';
export const USER_FAIL =     '[User] User failed to deliver';

export const Add_User = createAction(ADD_USER, props<{user: User}>())
export const Load_User = createAction(LOAD_USER, props<{userID: string}>())
export const User_Success = createAction(USER_SUCCESS, props<{user: User}>())
export const User_Fail = createAction(USER_FAIL, props<{error: string}>())
