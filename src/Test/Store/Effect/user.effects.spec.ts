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

describe("User Effects", () => {
  let actions: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
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
