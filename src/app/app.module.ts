import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

import { AppComponent } from './app.component';
import { GamePageComponent } from './component/game-page/game-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './Parts/table/table.component';
import { GameBoardComponent } from './Game/game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    TableComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
