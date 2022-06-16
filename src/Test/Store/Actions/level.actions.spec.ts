import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {Level_Success, Load_Level, Load_Levels, Load_Levels_By_IDs} from "../../../app/Store/Actions/level.actions";
import {levels} from "../../Dummy_Data/level";

describe("Level Actions", () => {
  let actions: Observable<any>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    initialState = fromReducer;
    TestBed.configureTestingModule({
      providers: [
        LevelEffects,
        provideMockActions(() => actions),
      ],
    });
  })
  it('Should have loaded the complete state', () =>{
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(initialState, actions);
    const state = fromReducer.reducer(initialState, actions)
    expect(state).toBe(initialState)
  })
  it('Should Load All Levels', () =>{
    const action = Load_Levels()
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.levels.levels = levels
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load Level By ID', () =>{
    const action = Load_Level({id: levels[0].id});
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.levels.level = levels[0]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load Levels By ID', () =>{
    const action = Load_Levels_By_IDs({levelIDs: [levels[0].id, levels[1].id,levels[3].id]});
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.levels.levels = [levels[0], levels[1],levels[3]]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  describe("Succesful Level", () =>{
    it('Level Array', () =>{
      const action = Level_Success({level: levels});
      const tempState= fromReducer.reducer(initialState, actions);
      tempState.levels.levels = levels
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
    it('Level Single', () =>{
      const action = Level_Success({level: levels[0]});
      const tempState= fromReducer.reducer(initialState, actions);
      tempState.levels.level = levels[0]
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
  })
})
