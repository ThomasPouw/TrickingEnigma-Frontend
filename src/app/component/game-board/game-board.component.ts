import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
    return 35;
  }
}
