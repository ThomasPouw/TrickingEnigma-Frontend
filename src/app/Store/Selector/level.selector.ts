import {createSelector} from "@ngrx/store";
import {State} from "../Reducers";
import {getLevelFeatureState} from "../Reducers/level.reducer";

export const getLevels = createSelector(getLevelFeatureState, (state: State) => state.levels.levels);
export const getLevel = createSelector(getLevelFeatureState, (state: State) => state.levels.level)
