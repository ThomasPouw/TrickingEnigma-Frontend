import {createAction, props} from "@ngrx/store";
import {User} from "../Model/User";

export const LOAD_USER = "[User] Load User";
export const USER_SUCCESS =    '[Game Page] Level successfully delivered';
export const USER_FAIL =     '[Game Page] Level failed to deliver';

export const User_Success = createAction(USER_SUCCESS, props<{user: User}>())
export const User_Fail = createAction(USER_FAIL, props<{error: string}>())
export const Load_User = createAction(LOAD_USER, props<{userID: string}>())
