import {createAction, props} from "@ngrx/store";
import {Nationality} from "../Model/Nationality";

export const LOAD_NATIONALITY_BY_ID = "[Nationality] Load Nationality By ID";
export const LOAD_All_NATIONALITY = "[Nationality] Load Nationality By ID";
export const POST_NATIONALITY = "[Nationality] Post Nationality";
export const Edit_NATIONALITY = "[Nationality] Edit Nationality";
export const NATIONALITY_SUCCESS =    '[Nationality] Nationality successfully delivered';
export const NATIONALITY_FAIL =     '[Nationality] Nationality failed to deliver';

export const Nationality_Success = createAction(NATIONALITY_SUCCESS, props<{nationality: Nationality | Nationality[]}>())
export const Nationality_Fail = createAction(NATIONALITY_FAIL, props<{error: string}>())
export const Load_NationalityByID = createAction(LOAD_NATIONALITY_BY_ID, props<{nationalityID: string}>())
export const Load_All_Nationality = createAction(LOAD_All_NATIONALITY)
export const Post_Nationality = createAction(POST_NATIONALITY, props<{nationality: Nationality}>())
export const Edit_Nationality = createAction(Edit_NATIONALITY, props<{nationality: Nationality}>())
