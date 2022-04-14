import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js'
import {backGround} from "./background/background";
import {Pieces} from "./Sprites/Pieces";

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
  constructor() { }

  ngOnInit(): void {
    let horizonalAmount: number = 20
    let VerticalAmount: number = 10
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
      new Pieces(app, (screen.offsetWidth/ horizonalAmount))
      app.stage.addChild(new backGround(screen.offsetWidth/ horizonalAmount))
    }
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
