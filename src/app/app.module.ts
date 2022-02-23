import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

import { AppComponent } from './app.component';
import { GamePageComponent } from './view/game-page/game-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './component/table/table.component';
import { UserPageComponent } from './view/user-page/user-page.component';
import { AdminPageComponent } from './view/admin-page/admin-page.component';
import {RouterModule} from "@angular/router";
import {URLrouterModule} from "./Route/router-module/URLrouter.module";
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    TableComponent,
    UserPageComponent,
    AdminPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule,
    URLrouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
