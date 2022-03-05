import * as PIXI from 'pixi.js'
export class backGround extends PIXI.Graphics{
  private space = 20;
  constructor() {
    super();

    this.beginFill(0x222222);
    var width = 20;
    for (let i = 0; i < width * width; i++) {
      this.drawRect(0, i * this.space, width * width * width, 1);
      this.drawRect(i * this.space, 0, 1, width * width * width);
    }
    this.endFill();
  }
}
