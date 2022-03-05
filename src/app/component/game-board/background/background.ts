import * as PIXI from 'pixi.js'
export class backGround extends PIXI.Graphics{
  constructor(Width: number) {
    super();
    let width: number = Width;
    this.beginFill(0x808080);
    for (let i = 0; i < width * width; i++) {
      this.drawRect(0, i * width, width * width * width, 1);
      this.drawRect(i * width, 0, 1, width * width * width);
    }
    this.endFill();
  }
}
