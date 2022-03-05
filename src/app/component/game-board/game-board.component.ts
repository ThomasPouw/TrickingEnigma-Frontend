import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js'
import {backGround} from "./background/background";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  time: number = 0;
  interval: any;
  start: boolean = false;
  TimeCounter: string= "0:00";
  private app: PIXI.Application = new PIXI.Application({
    width: 2000,
    height: 800,
    backgroundColor: 0x1099bb
  });
  constructor() { }

  ngOnInit(): void {
    //https://medium.com/codex/create-a-multiplayer-game-using-angular-and-pixi-js-part-1-7fafccc2c996
    console.log(this.app)
    let screen = document.getElementById("board");
    if(screen !== null){
      screen.appendChild(this.app.view)
    }
    this.app.stage.addChild(new backGround(50))
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
    return 35;
  }
}
