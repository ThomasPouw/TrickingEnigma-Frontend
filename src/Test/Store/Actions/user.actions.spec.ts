import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {
  Edit_Nationality,
  Load_All_Nationality,
  Load_NationalityByID, Nationality_Success,
  Post_Nationality
} from "../../../app/Store/Actions/nationality.actions";
import {nationalities} from "../../Dummy_Data/nationality";
import {
  Add_User,
  Edit_User,
  Load_User,
  Load_User_Login,
  Load_Users,
  Load_Users_By_Nationality, User_Success
} from "../../../app/Store/Actions/user.actions";
import {Nationality} from "../../../app/Store/Model/Nationality";
import {users} from "../../Dummy_Data/user";
import {records} from "../../Dummy_Data/record";

describe("User Actions", () => {
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
  it('Should have loaded the complete state', () => {
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(initialState, actions);
    const state = fromReducer.reducer(initialState, actions)
    expect(state).toBe(initialState)
  })
  it('Should give me a User in User if i post a new user', () => {
    const action = Add_User({user: {id: "435465687908", name: "John Doom", secret: "auth_356473456", nationality: nationalities[0]}});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.user = {id: "435465687908", name: "John Doom", secret: "auth_356473456", nationality: nationalities[0]}
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should give me a different Nationality in Nationality if i Edit a new nationality', () => {
    const action = Edit_User({user: {id: "435465687908", name: "John Doom", secret: "auth_356473456", nationality: nationalities[0]}});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.user = {id: "435465687908", name: "John Doom", secret: "auth_356473456", nationality: nationalities[0]}
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load All Users', () => {
    const action = Load_Users({userIDs: [records[0].userID, records[0].userID]})
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.users = [users[1], users[0]]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load User By Secret', () => {
    const action = Load_User_Login({secret: users[0].secret});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.user = users[0]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load User By ID', () => {
    const action = Load_User({userID: users[0].id});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.user = users[0]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load Users By Nationality', () => {
    const action = Load_Users_By_Nationality({userIDs: [users[1].id], nationality_ID: nationalities[0].id});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.users.user = users[1]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  describe("Succesful loaded Users", () => {
    it('User Array', () => {
      const action = User_Success({user: users});
      const tempState = fromReducer.reducer(initialState, actions);
      tempState.users.users = users
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
    it('User Single', () => {
      const action = User_Success({user: users[0]});
      const tempState = fromReducer.reducer(initialState, actions);
      tempState.users.user = users[0]
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
  })
})
