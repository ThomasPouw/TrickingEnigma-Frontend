import {createSelector} from "@ngrx/store";
import {State} from "../Reducers";
import {getLevelFeatureState} from "../Reducers/level.reducer";

export const getAllLevel = createSelector(getLevelFeatureState, (state: State) => state.levels.level);
