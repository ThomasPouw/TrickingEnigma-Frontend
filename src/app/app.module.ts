//Modules
import { NgModule } from '@angular/core';
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
import { LineChartComponent } from './component/line-chart/line-chart.component';
import { FooterComponent } from './component/footer/footer.component';
import {StoreModule} from "@ngrx/store";


//NGRX store
import {RecordsModule} from "./Store/Modules/records.module";
import {EffectsModule} from "@ngrx/effects";
import {RecordEffects} from "./Store/Effects/records.effects";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {reducer} from "./Store/Reducers";

//

@NgModule({
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
    LineChartComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule,
    URLrouterModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    NgxEchartsModule.forRoot({
      echarts}),
    StoreModule.forRoot(reducer),
    RecordsModule,
    EffectsModule.forRoot([RecordEffects]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent, SideBarComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
