import {createSelector, DefaultProjectorFn} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";
import {Nationality} from "../Model/Nationality";

export const getAllNationalities = createSelector(getRecordFeatureState, (state: State) => state.nationalities.nationalities);
export const getNationality = createSelector(getRecordFeatureState, (state: State) => state.nationalities.nationality);
export const getNationalityLogin =(id: string)=> createSelector(getRecordFeatureState, (state: State) => state.nationalities.nationalities.filter(nationality => nationality.id === id)[0]);
