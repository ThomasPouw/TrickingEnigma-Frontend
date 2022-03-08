import * as PIXI from 'pixi.js'
export class backGround extends PIXI.Graphics{
  constructor(space: number) {
    super();
    this.beginFill(0x737373);
    for (let i = 0; i < space * space; i++) {
      this.drawRect(0, i * space, space * space * space, 1);
      this.drawRect(i * space, 0, 1, space * space * space);
    }
    this.endFill();
  }
}
