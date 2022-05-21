import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import {Level} from "../../Store/Model/Level";
import * as LevelActions from "../../Store/Actions/level.actions";
import {getLevels} from "../../Store/Selector/level.selector";

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.css']
})
export class GameSelectComponent implements OnInit {
  public levels: Level[] = []
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.store.dispatch({type: LevelActions.LOAD_LEVELS});
    this.store.select<Level[]>(getLevels).subscribe(
      level => this.levels = level
    )
  }

}
