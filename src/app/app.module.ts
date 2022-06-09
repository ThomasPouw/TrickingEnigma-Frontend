//Modules
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {URLrouterModule} from "./Route/router-module/URLrouter.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {NgxEchartsModule} from "ngx-echarts";
import {AuthModule} from '@auth0/auth0-angular';
import {MatSelectModule} from "@angular/material/select";
import * as echarts from 'echarts';

//Components
import { AppComponent } from './app.component';
import { GamePageComponent } from './view/game-page/game-page.component';
import { TableComponent } from './component/table/table.component';
import { UserPageComponent } from './view/user-page/user-page.component';
import { AdminPageComponent } from './view/admin-page/admin-page.component';
import { HeaderComponent } from './component/header/header.component';
import { RecordsComponent } from './component/records/records.component';
import { GameBoardComponent } from './component/game-board/game-board.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './view/login/login.component';
import { UserPageRecordComponent } from './component/user-page-record/user-page-record.component';
import { GameSelectComponent } from './view/game-select/game-select.component';

//NGRX store
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "./Store/Effects/records.effects";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {reducer} from "./Store/Reducers";
import {LevelEffects} from "./Store/Effects/level.effects";
import {UserEffects} from "./Store/Effects/user.effects";
import {NationalityEffects} from "./Store/Effects/nationality.effects";
import {StoreModule} from "@ngrx/store";
import { HttpClientModule} from '@angular/common/http';
import {MatSortModule} from "@angular/material/sort";

//provider
import {Token} from "./Util/API_Token";
//

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
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
    UserPageRecordComponent,

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
    MatSelectModule,

  ],
  exports: [
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
