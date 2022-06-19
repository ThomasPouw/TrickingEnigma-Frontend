import * as PIXI from 'pixi.js'
export class backGround extends PIXI.Graphics{
  constructor(clientWidth: number, X: number, Y: number) {
    super();
    this.beginFill(0x737373);
    if(X > Y)
      for (let i = 0; i <= X+1; i++) {
        this.drawRect(0, i * (clientWidth/X), clientWidth, 1);
        this.drawRect(i * (clientWidth/Y), 0, 1, (clientWidth/X)*Y);
      }
    else
      for (let i = 0; i <= Y+1; i++) {
        this.drawRect(0, i * (clientWidth/X), clientWidth, 1);
        this.drawRect(i * (clientWidth/Y), 0, 1, (clientWidth/X)*Y);
      }
    this.endFill();
  }
}
