import {createSelector, DefaultProjectorFn} from "@ngrx/store";
import {getRecordFeatureState} from "../Reducers/records.reducer";
import {State} from "../Reducers";
import {Nationality} from "../Model/Nationality";
import {getNationalityFeatureState} from "../Reducers/nationality.reducer";

export const getAllNationalities = createSelector(getNationalityFeatureState, (state: State) => state.nationalities.nationalities);
export const getNationality = createSelector(getNationalityFeatureState, (state: State) => state.nationalities.nationality);
export const getNationalityLogin =(id: string)=> createSelector(getNationalityFeatureState, (state: State) => state.nationalities.nationalities.filter(nationality => nationality.id === id)[0]);
