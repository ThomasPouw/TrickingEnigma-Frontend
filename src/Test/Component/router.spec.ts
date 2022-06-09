import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick, async} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router, RouterModule} from "@angular/router";
import {URLrouterModule} from "../../app/Route/router-module/URLrouter.module";
import {GamePageComponent} from "../../app/view/game-page/game-page.component";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from "@angular/core";
import {AppComponent} from "../../app/app.component";
import {TableComponent} from "../../app/component/table/table.component";
import {UserPageComponent} from "../../app/view/user-page/user-page.component";
import {AdminPageComponent} from "../../app/view/admin-page/admin-page.component";
import {GameSelectComponent} from "../../app/view/game-select/game-select.component";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../../app/Store/Reducers";
import {HeaderComponent} from "../../app/component/header/header.component";
import {RecordsComponent} from "../../app/component/records/records.component";
import {GameBoardComponent} from "../../app/component/game-board/game-board.component";
import {SideBarComponent} from "../../app/component/side-bar/side-bar.component";
import {FooterComponent} from "../../app/component/footer/footer.component";
import {LoginComponent} from "../../app/view/login/login.component";
import {UserPageRecordComponent} from "../../app/component/user-page-record/user-page-record.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxEchartsModule} from "ngx-echarts";
import * as echarts from "echarts";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "../../app/Store/Effects/records.effects";
import {LevelEffects} from "../../app/Store/Effects/level.effects";
import {UserEffects} from "../../app/Store/Effects/user.effects";
import {NationalityEffects} from "../../app/Store/Effects/nationality.effects";
import {LayoutModule} from "@angular/cdk/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "@auth0/auth0-angular";
import {MatSelectModule} from "@angular/material/select";
import {NationalityService} from "../../app/Store/Service/nationality.service";
import {Observable} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
describe("Router", () => {
  let location: Location;
  let router: Router;
  let fixture;
  let actions: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions),
        {
          provide: NationalityService,
          useValue: {
            GetNationalities: jasmine.createSpy()
          }
        }
      ],
      declarations: [
        AppComponent,
        GamePageComponent,
        TableComponent,
        UserPageComponent,
        AdminPageComponent,
        HeaderComponent,
        RecordsComponent,
        GameBoardComponent,
        SideBarComponent,
        FooterComponent,
        LoginComponent,
        GameSelectComponent,
        UserPageRecordComponent
      ],
      imports: [
        BrowserModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        RouterModule,
        URLrouterModule,
        TextFieldModule,
        MatFormFieldModule,
        MatInputModule,
        NgxEchartsModule.forRoot({
          echarts
        }),
        StoreModule.forRoot({reducer}),
        EffectsModule.forRoot([RecordEffects, LevelEffects, UserEffects, NationalityEffects]),
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-yw9oh5an.us.auth0.com',
          clientId: 'GHQa52igJs2ccnZJj3SeDGbrG2gVilPm',
        }),
        MatSelectModule
      ]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  })
  it('navigate to "/GameSelect"', fakeAsync(() => {
    router.navigate(['/GameSelect']);
    tick();
    expect(location.path()).toBe('/GameSelect');
  }));
  it('navigate to "/User"', fakeAsync(() => {
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
    router.navigate(['/User']);
    tick(15000);
    expect(location.path()).toBe('/User');
  }));
  it('navigate to "/Game"', fakeAsync(() => {
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
    router.navigate(['/Game/89543dac-9770-4972-a8bc-bfa7d18a3b84']);
    tick(15000);
    expect(location.path()).toBe('/Game/89543dac-9770-4972-a8bc-bfa7d18a3b84');
  }));
  it('navigate to "/Admin"', fakeAsync(() => {
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967')
    router.navigate(['/Admin']);
    tick(15000);
    expect(location.path()).toBe('/Admin');
  }));
  it('navigate to "/Login"', fakeAsync(() => {
    sessionStorage.setItem("userID", '33fe0ee2-3b94-4e9d-82ab-434d08650967');
    let effects = TestBed.get(NationalityEffects);
    let nationalityServiceTest = TestBed.get(NationalityService);
    router.navigate(['/Login']);
    tick(15000);
    expect(location.path()).toBe('/Login');
  }));
})
