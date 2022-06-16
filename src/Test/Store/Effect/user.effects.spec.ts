import {Observable} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {UserService} from "../../../app/Store/Service/user.service";
import {UserEffects} from "../../../app/Store/Effects/user.effects";
import {nationalities} from "../../Dummy_Data/nationality";
import {cold, hot} from "jasmine-marbles";
import {
  Add_User,
  Edit_User,
  Load_User,
  Load_User_Login,
  Load_Users,
  User_Success
} from "../../../app/Store/Actions/user.actions";
import {users} from "../../Dummy_Data/user";
import {RouterModule} from "@angular/router";
import {URLrouterModule} from "../../../app/Route/router-module/URLrouter.module";
import * as fromReducer from "../../../app/Store/Reducers";
import {records} from "../../Dummy_Data/record";
import {levels} from "../../Dummy_Data/level";

describe("User Effects", () => {
  let actions: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        URLrouterModule,
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        {
          provide: UserService,
          useValue: {
            GetUserLogin: jasmine.createSpy(),
            GetUserByID: jasmine.createSpy(),
            GetUsersByID:jasmine.createSpy(),
            GetUsersByIDAndNationalityID: jasmine.createSpy(),
            PostUser: jasmine.createSpy(),
            EditUser:jasmine.createSpy(),
          }
        },
      ],
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.get(UserService);
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user = users[0];
    initialState.levels.levels = levels;
    initialState.levels.level = levels[0];
  });
  it('Should return User when called by Secret', () =>{
    const action = Load_User_Login({secret: users[0].secret});
    const outcome = User_Success({user: users[0]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: users[0] });
    userService.GetUserLogin.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadUserBySecret$).toBeObservable(expected);
  })
  it('Should return User when called by ID', () =>{
    const action = Load_User({userID: users[0].id});
    const outcome = User_Success({user: users[0]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: users[0] });
    userService.GetUserByID.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadUserByID$).toBeObservable(expected);
  })
  it('Add Users', () =>{
    const action = Add_User({user: {nationality: nationalities[1], name: "AAAAH!", secret: "secret?"}});
    const outcome = User_Success({user: {nationality: nationalities[1], name: "AAAAH!", secret: "secret?"}})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: {nationality: nationalities[1], name: "AAAAH!", secret: "secret?"} });
    userService.PostUser.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.PostUser$).toBeObservable(expected);
  })
})
