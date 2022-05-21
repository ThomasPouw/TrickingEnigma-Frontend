import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js'
import {backGround} from "./background/background";
import {Pieces} from "./Sprites/Pieces";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as LevelActions from "../../Store/Actions/level.actions"
import * as RecordActions from "../../Store/Actions/records.actions"
import {getLevel} from "../../Store/Selector/level.selector";
import {Level} from "../../Store/Model/Level";
import {getUser} from "../../Store/Selector/user.selector";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  private static id: string = "";
  public static turnCount: number = 0;
  public static time: number = 0;
  public static interval: any;
  public static start: boolean = false;
  public static TimeCounter: string= "0:00";
  private static LevelName: string = "";
  private static store: Store<fromRoot.State>;
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
    this.route.params
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          GameBoardComponent.id = params['id'];
          console.log(GameBoardComponent.id)
          // price
          GameBoardComponent.store = this.store;
          this.store.dispatch({type: LevelActions.LOAD_LEVEL, id: GameBoardComponent.id});
          this.store.select<Level>(getLevel).subscribe(
            stage => {
              let level = stage;
              console.log(level)
              GameBoardComponent.LevelName = level.name

              let screen = document.getElementById("board");

              if(screen !== null){
                if(screen.childElementCount !== 1){
                  const app: PIXI.Application= new PIXI.Application({
                    width: screen.offsetWidth,
                    height: (screen.offsetWidth/ level.x_length)* level.y_length,
                    backgroundColor: 0x1099bb
                  });
                  console.log(screen.offsetWidth+" and "+ screen.offsetHeight)
                  screen.appendChild(app.view);
                  new Pieces(app, (screen.offsetWidth/ level.x_length), level.levelSprite)
                  app.stage.addChild(new backGround(screen.offsetWidth/ level.x_length))
                }
              }
            }
          )
        }
      );
  }

  ngOnInit(): void {

  }
static counter(start: boolean): void{
    if(start){
      GameBoardComponent.start = start;
      this.interval = setInterval(() => {
        this.time++;
        this.TimeCounter = (Math.floor(this.time/60)) +":"+ ('0' + (this.time % 60)).slice(-2)
      },1000);
    }
    else{
      GameBoardComponent.start = start;
      clearInterval(this.interval);
    }
  }
static recordStore(): void{
    GameBoardComponent.store.select(getUser).subscribe(user => {
      if(user !== undefined){
        console.log({userID: user.id, courseId: GameBoardComponent.id, time: GameBoardComponent.time, turns: GameBoardComponent.turnCount})
        GameBoardComponent.store.dispatch({type: RecordActions.ADD_RECORD, record: {userID: user.id, courseId: GameBoardComponent.id, time: GameBoardComponent.time, turns: GameBoardComponent.turnCount}})
      }
    })
}
  turnCount(): number {
    return GameBoardComponent.turnCount
  }
  TimeCounter(): string {
    return GameBoardComponent.TimeCounter
  }
  LevelName(): string {
    return GameBoardComponent.LevelName
  }
}
