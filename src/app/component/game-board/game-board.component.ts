import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js'

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
    width: window.innerWidth,
    height: window.innerHeight
  });
  constructor() { }

  ngOnInit(): void {
    console.log(this.app)
    document.body.appendChild(this.app.view)
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
