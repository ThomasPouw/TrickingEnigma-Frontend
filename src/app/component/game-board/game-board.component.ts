import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js'
import {backGround} from "./background/background";
import {Pieces} from "./Sprites/Pieces";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as LevelActions from "../../Store/Actions/level.actions"
import {getLevelByID} from "../../Store/Selector/Level.selector";
import {Level} from "../../Store/Model/Level";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  public static turnCount: number = 0;
  time: number = 0;
  interval: any;
  start: boolean = false;
  TimeCounter: string= "0:00";
  LevelName: string = "";
  constructor(private store: Store<fromRoot.State>) {
    console.log("test")
    store.dispatch({type: LevelActions.LOAD_LEVEL, id: "9948f878-9970-4cdf-ab76-4c0f95faaebe"});
    store.select<Level>(getLevelByID).subscribe(
      level => {
        console.log(level)
        this.LevelName = level.name
        let horizonalAmount: number = 20//level.horizon_tile
        let VerticalAmount: number = 10//level.vertical_tile
        //https://medium.com/codex/create-a-multiplayer-game-using-angular-and-pixi-js-part-1-7fafccc2c996
        let screen = document.getElementById("board");

        if(screen !== null){
          const app: PIXI.Application= new PIXI.Application({
            width: screen.offsetWidth,
            height: (screen.offsetWidth/ horizonalAmount)* VerticalAmount,
            backgroundColor: 0x1099bb
          });
          console.log(screen.offsetWidth+" and "+ screen.offsetHeight)
          screen.appendChild(app.view);
          new Pieces(app, (screen.offsetWidth/ horizonalAmount), level.levelSprite)
          app.stage.addChild(new backGround(screen.offsetWidth/ horizonalAmount))
        }
      }
    )
  }

  ngOnInit(): void {
  }
counter(start: boolean): void{
    if(start){
      this.start = start;
      this.interval = setInterval(() => {
        this.time++;
        this.TimeCounter = (Math.floor(this.time/60)) +":"+ ('0' + (this.time % 60)).slice(-2)
      },1000);
    }
    else{
      this.start = start;
      clearInterval(this.interval);
    }
  }

  turnCount(): number {
    return GameBoardComponent.turnCount
  }
}
