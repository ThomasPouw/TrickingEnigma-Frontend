import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {nationalities} from "../../Dummy_Data/nationality";
import {
  getAllNationalities,
  getNationality,
  getNationalityLogin
} from "../../../app/Store/Selector/nationality.selector";
import {getNationalityFeatureState} from "../../../app/Store/Reducers/nationality.reducer";
import {users} from "../../Dummy_Data/user";

describe("Nationality Selector", () => {
  let actions: Observable<any>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions),
      ],
    });
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
  })
  it("should give all nationality", () => {
    expect(getAllNationalities.projector(initialState)).toBe(nationalities);
  })
  it("should give single nationality", () => {
    expect(getNationality.projector(initialState)).toBe(nationalities[0]);
  })
  it("should give single nationality", () => {
    expect(getNationalityLogin(users[0].nationality.id).projector(initialState)).toBe(nationalities[1]);
  })
})
