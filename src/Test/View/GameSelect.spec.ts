import {Observable, of} from "rxjs";
import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {RecordsComponent} from "../../app/component/records/records.component";
import {DebugElement} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Location} from "@angular/common";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {reducer, State} from "../../app/Store/Reducers";
import {levels} from "../Dummy_Data/level";
import {GameBoardComponent} from "../../app/component/game-board/game-board.component";
import {route, URLrouterModule} from "../../app/Route/router-module/URLrouter.module";
import {Store, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "../../app/Store/Effects/records.effects";
import {LevelEffects} from "../../app/Store/Effects/level.effects";
import {UserEffects} from "../../app/Store/Effects/user.effects";
import {NationalityEffects} from "../../app/Store/Effects/nationality.effects";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserModule, By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getLevel, getLevels} from "../../app/Store/Selector/level.selector";
import {getAllRecords} from "../../app/Store/Selector/records.selector";
import {records} from "../Dummy_Data/record";
import {GameSelectComponent} from "../../app/view/game-select/game-select.component";
import {RouterTestingModule} from "@angular/router/testing";

describe("GameSelect Page", () => {
  let actions: Observable<any>;
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
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
      declarations: [GameSelectComponent],
      imports: [
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
        RouterTestingModule.withRoutes(route())
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
    mockStore.overrideSelector(getLevels, levels);
    mockStore.refreshState();
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
  })
  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {
    });
  });
  it('should create The GameSelect Page', fakeAsync(() => {
    expect(component).toBeTruthy();
  }))
  it('should have multible levels as a selection', fakeAsync(() => {
    const compiled = fixture.nativeElement.querySelectorAll('div.container_level');
    expect(compiled.innerHTML).not.toBeNull();
    expect(compiled.length).toBe(4)
  }))
  it('should have multible levels as a selection', fakeAsync(() => {
    let selectorbtn =(fixture.debugElement.nativeElement.querySelector("div.container_level").children[0])
    selectorbtn.click()
    tick(100)
    expect(router.url).toBe('/Game/9948f878-9970-4cdf-ab76-4c0f95faaebe')
  }))
})
