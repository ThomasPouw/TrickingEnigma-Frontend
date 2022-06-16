import {Observable, of} from "rxjs";
import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Location} from "@angular/common";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {reducer, State} from "../../app/Store/Reducers";
import {levels} from "../Dummy_Data/level";
import {RecordsComponent} from "../../app/component/records/records.component";
import {GameBoardComponent} from "../../app/component/game-board/game-board.component";
import {URLrouterModule} from "../../app/Route/router-module/URLrouter.module";
import {Store, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "../../app/Store/Effects/records.effects";
import {LevelEffects} from "../../app/Store/Effects/level.effects";
import {UserEffects} from "../../app/Store/Effects/user.effects";
import {NationalityEffects} from "../../app/Store/Effects/nationality.effects";
import {HttpClientModule} from "@angular/common/http";
import {getLevel} from "../../app/Store/Selector/level.selector";
import {getAllBestUserRecords, getAllRecords, getUserRecord} from "../../app/Store/Selector/records.selector";
import {records} from "../Dummy_Data/record";
import {UserPageComponent} from "../../app/view/user-page/user-page.component";
import {UserPageRecordComponent} from "../../app/component/user-page-record/user-page-record.component";
import {provideMockActions} from "@ngrx/effects/testing";
import {UserService} from "../../app/Store/Service/user.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {nationalities} from "../Dummy_Data/nationality";
import {users} from "../Dummy_Data/user";
import * as fromReducer from "../../app/Store/Reducers";

describe("User Page", () => {
  let actions: Observable<any>;
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let de: DebugElement
  let router: Router;
  let location: Location;
  let store: MockStore<State>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      declarations: [UserPageComponent, UserPageRecordComponent],
      imports: [
        RouterModule,
        URLrouterModule,
        StoreModule.forRoot({reducer}),
        EffectsModule.forRoot([RecordEffects, LevelEffects, UserEffects, NationalityEffects]),
        HttpClientModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        {
          provide: UserService,
          useValue: {
            GetUsersByID:jasmine.createSpy(),
            EditUser:jasmine.createSpy(),
          }
        },
        {
          provide: RecordEffects,
          useValue: {
            GetUserRecords:jasmine.createSpy(),
          }
        },
        {
          provide: LevelEffects,
          useValue: {
            GetLevelsByID:jasmine.createSpy(),
          }
        },
        provideMockStore(),
      ]

    }).compileComponents();
    store = TestBed.inject(MockStore);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    let mockStore = TestBed.get(Store);
    mockStore.overrideSelector(getAllRecords, [records[2],records[3], records[4], records[6], records[7], records[8], records[9], records[10]]);
    mockStore.overrideSelector(getAllBestUserRecords, [records[2],records[3], records[4], records[6], records[7], records[8], records[9], records[10]]);
    mockStore.refreshState();
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user = users[0];
    initialState.levels.levels = levels;
    initialState.levels.level = levels[0];
  })
  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });
  it('should create The User Page', fakeAsync(() => {
    expect(component).toBeTruthy();
  }))
  it('should have multiple records already in the record section', fakeAsync(() => {
    let fixture2: ComponentFixture<UserPageRecordComponent> = TestBed.createComponent(UserPageRecordComponent);
    fixture2.detectChanges()
    const compiled = fixture2.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('div.container_record')?.length).toBe(8)
  }))
  it('should be able to sort records by time', fakeAsync(() => {
    let component: UserPageRecordComponent;
    let fixture2: ComponentFixture<UserPageRecordComponent> = TestBed.createComponent(UserPageRecordComponent);
    component = fixture2.componentInstance;
    fixture2.detectChanges()
    let sortbtn =(fixture.debugElement.nativeElement.querySelector("div.container_buttons").children[0])
    sortbtn.click()
    tick(100)
    expect(component.Personal_Records[0].time).toBe(records[7].time)
  }))
  it('should be able to sort records by turns', fakeAsync(() => {
    let component: UserPageRecordComponent;
    let fixture2: ComponentFixture<UserPageRecordComponent> = TestBed.createComponent(UserPageRecordComponent);
    component = fixture2.componentInstance;
    fixture2.detectChanges()
    let sortbtn =(fixture.debugElement.nativeElement.querySelector("div.container_buttons").children[1])
    sortbtn.click()
    expect(component.Personal_Records[0].turns).toBe(records[1].turns)
  }))
  it('should be able to sort records by name', fakeAsync(() => {
    let component: UserPageRecordComponent;
    let fixture2: ComponentFixture<UserPageRecordComponent> = TestBed.createComponent(UserPageRecordComponent);
    component = fixture2.componentInstance;
    fixture2.detectChanges()
    let sortbtn =(fixture.debugElement.nativeElement.querySelector("div.container_buttons").children[2])
    sortbtn.click()
    expect(component.Personal_Records[0].levelName).toBe(records[10].levelName)
  }))
  it('should be able to sort records by record Created', fakeAsync(() => {
    let component: UserPageRecordComponent;
    let fixture2: ComponentFixture<UserPageRecordComponent> = TestBed.createComponent(UserPageRecordComponent);
    component = fixture2.componentInstance;
    fixture2.detectChanges()
    let sortbtn =(fixture.debugElement.nativeElement.querySelector("div.container_buttons").children[3])
    sortbtn.click()
    expect(component.Personal_Records[0].recordCreated).toBe(records[4].recordCreated)
  }))
})
