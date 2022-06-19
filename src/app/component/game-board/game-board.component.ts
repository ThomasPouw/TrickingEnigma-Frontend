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
  private screen: any;
  private app: any;
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
          GameBoardComponent.id = params['id'];
          GameBoardComponent.store = this.store;
        if( this.screen === undefined) {
          this.screen = document.getElementById("board");

          if (this.screen?.childElementCount !== 1) {
            this.store.dispatch({type: LevelActions.LOAD_LEVEL, id: GameBoardComponent.id});
            this.store.select<Level>(getLevel).subscribe(
              level => {
                if(level !== undefined){
                  GameBoardComponent.LevelName = level.name
                  if(this.screen.children.length !== null){
                    if(this.app !== undefined){
                      this.screen.removeChild(this.app.view)
                    }
                        this.app= new PIXI.Application({
                          width: this.screen.clientWidth,
                          height: this.screen.clientWidth/ (level.x_length/ level.y_length),
                          backgroundColor: 0x979391
                        });
                      this.screen.appendChild(this.app.view);
                      new Pieces(this.app, (this.screen.clientWidth/ level.x_length), level.levelSprite)
                      this.app.stage.addChild(new backGround(this.screen.clientWidth,  level.x_length, level.y_length))
                  }
                }
              }
            )
          }
        }
      }
    );
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
  GameBoardComponent.store.dispatch({type: RecordActions.ADD_RECORD, record: {userID: sessionStorage.getItem("userID"), levelID: GameBoardComponent.id, time: GameBoardComponent.time, turns: GameBoardComponent.turnCount}})
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
