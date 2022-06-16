import {Location} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs";
import * as fromReducer from "../../app/Store/Reducers";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {NationalityService} from "../../app/Store/Service/nationality.service";
import {TableComponent} from "../../app/component/table/table.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../../app/Store/Reducers";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "../../app/Store/Effects/records.effects";
import {LevelEffects} from "../../app/Store/Effects/level.effects";
import {UserEffects} from "../../app/Store/Effects/user.effects";
import {NationalityEffects} from "../../app/Store/Effects/nationality.effects";
import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {nationalities} from "../Dummy_Data/nationality";
import {records} from "../Dummy_Data/record";
import {users} from "../Dummy_Data/user";
import {levels} from "../Dummy_Data/level";
import {HttpClientModule} from "@angular/common/http";
import {URLrouterModule} from "../../app/Route/router-module/URLrouter.module";

describe("Router", () => {
  let location: Location;
  let router: Router;
  let component: TableComponent;
  let fixture;
  let actions: Observable<any>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions),

      ],
      declarations: [TableComponent],
      imports: [
        MatTableModule,
        StoreModule.forRoot({reducer}),
        EffectsModule.forRoot([RecordEffects, LevelEffects, UserEffects, NationalityEffects]),
        HttpClientModule,
        RouterModule,
        URLrouterModule,
      ]
    })
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    //The thing that produces 950 errors without
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user = users[0];
    initialState.levels.levels = levels;
    initialState.levels.level = levels[0];
  })
  it('should create The Table', fakeAsync(() => {
    expect(component).toBeTruthy();
  }))
})
