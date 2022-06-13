import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Location} from "@angular/common";
import {URLrouterModule} from "../../app/Route/router-module/URLrouter.module";
import {RecordsComponent} from "../../app/component/records/records.component";
import {GameBoardComponent} from "../../app/component/game-board/game-board.component";
import {Store, StoreModule} from "@ngrx/store";
import {reducer, State} from "../../app/Store/Reducers";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "../../app/Store/Effects/records.effects";
import {LevelEffects} from "../../app/Store/Effects/level.effects";
import {UserEffects} from "../../app/Store/Effects/user.effects";
import {NationalityEffects} from "../../app/Store/Effects/nationality.effects";
import {HttpClientModule} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {provideMockActions} from "@ngrx/effects/testing";
import {RecordService} from "../../app/Store/Service/record.service";
import {LevelService} from "../../app/Store/Service/level.service";
import {hot} from "jasmine-marbles";
import {levels} from "../Dummy_Data/level";
import {Level} from "../../app/Store/Model/Level";
import {getLevel} from "../../app/Store/Selector/level.selector";
import {Record} from "../../app/Store/Model/Record";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import * as fromLevels from "../../app/Store/Reducers/level.reducer";
import {getRecords} from "../../app/Store/Reducers/records.reducer";
import {records} from "../Dummy_Data/record";
import {getAllRecords} from "../../app/Store/Selector/records.selector";
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
import {BrowserModule, By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe("Game Page", () =>{
  let actions: Observable<any>;
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let component2: RecordsComponent;
  let fixture2: ComponentFixture<RecordsComponent>;
  let component3: GameBoardComponent;
  let fixture3: ComponentFixture<GameBoardComponent>;
  let de: DebugElement
  let router: Router;
  let location: Location;
  let store: MockStore<State>;
const initialState = {
  levels: {
    levels: levels,
    level: levels[0]
  }
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamePageComponent, RecordsComponent, GameBoardComponent],
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
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: "9948f878-9970-4cdf-ab76-4c0f95faaebe"
            })
          }
        },
        provideMockStore(),
      ],

    }).compileComponents();
    store = TestBed.inject(MockStore);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    let mockStore = TestBed.get(Store);
    mockStore.overrideSelector(getLevel, levels[0]);
    mockStore.overrideSelector(getAllRecords, records);
    mockStore.refreshState();
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
  })
  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture2 = TestBed.createComponent(RecordsComponent);
    component2 = fixture2.componentInstance;
    fixture3 = TestBed.createComponent(GameBoardComponent);
    component3 = fixture3.componentInstance;
    component3.ngOnInit()
    fixture.detectChanges();
    fixture2.detectChanges();
    fixture3.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });
  it('should create The Game Page', fakeAsync(() => {
    expect(component).toBeTruthy();
  }))
  it('should display a levelName when given an levelid', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    console.log(compiled)
    console.log(compiled.querySelector('h1').textContent)
    if(compiled.querySelector('h1').textContent !== "")
    expect(compiled.querySelector('h1').textContent).toBe('Hasta La Vista Station');
    else{
      tick(3000)
      expect(compiled.querySelector('h1').textContent).toBe('Hasta La Vista Station');
    }

  }))//https://christianlydemann.com/the-complete-guide-to-ngrx-testing/
  it('should display a board for the game', fakeAsync(() => {
    component3.ngOnInit()
    const compiled = fixture3.debugElement.queryAll(By.css('.board'))[0];
    expect(compiled.nativeNode.innerHTML).not.toBeNull();
  }))
  it('should be able to click the record button to see all record of level', fakeAsync(() => {
    let recordbtn =(fixture2.debugElement.nativeElement.querySelector("div.record-button"))
    recordbtn.click()
    expect(component2.showRecord).toBe(true);
  }))
})

