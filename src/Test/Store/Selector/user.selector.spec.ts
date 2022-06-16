import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {nationalities} from "../../Dummy_Data/nationality";
import {records} from "../../Dummy_Data/record";
import {users} from "../../Dummy_Data/user";
import {levels} from "../../Dummy_Data/level";
import {getLevel, getLevels} from "../../../app/Store/Selector/level.selector";
import {getAllUsers, getUser} from "../../../app/Store/Selector/user.selector";

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
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user = users[0];
    initialState.levels.levels = levels;
    initialState.levels.level = levels[0];
  })
  it("should give all users", () => {
    expect(getAllUsers.projector(initialState)).toBe(users);
  })
  it("should give level by ID", () => {
    expect(getUser.projector(initialState)).toEqual(users[0]);
  })
})
