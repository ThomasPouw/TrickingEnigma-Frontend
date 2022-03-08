import * as Pixi from 'pixi.js'
import {PieceDirection} from "./piece-direction";

interface Sprite {
  X: number,
  Y: number,
  assetLocation: string,
  side: PieceDirection
}
export class Pieces extends Pixi.Sprite{
  private dragging: any;
  private data: any;
  private static space: number =0;
  constructor(App: Pixi.Application, Space: number) {
    super()
    this.SpriteMaker(App, Space, [
      {X: 3, Y: 0, assetLocation:'assets/L-vorm.png', side: PieceDirection.North},
      {X: 0, Y: 1, assetLocation:'assets/U-vorm.png', side: PieceDirection.North},
      {X: 6, Y: 1, assetLocation:'assets/Big_Block-vorm.png', side: PieceDirection.North},
      {X: 5, Y: 2, assetLocation:'assets/Block-vorm.png', side: PieceDirection.North},
      {X: 0, Y: 0, assetLocation:'assets/T-vorm.png', side: PieceDirection.North},
      {X: 4, Y: 0, assetLocation:'assets/Plank-vorm.png', side: PieceDirection.North},
      {X: 4, Y: 2, assetLocation:'assets/short_L-vorm.png', side: PieceDirection.North},
      {X: 2, Y: 2, assetLocation:'assets/short_L-vorm.png', side: PieceDirection.West
      }
    ])
  }
  SpriteMaker(App: Pixi.Application, Space: number, sprite: Sprite[]){
    Pieces.space = Space;
    for(let i = 0; i < sprite.length; i++){
      let shapes= Pixi.Sprite.from(sprite[i].assetLocation);
      shapes.anchor.set(0,0)
      switch(sprite[i].side){
        case PieceDirection.North:
          break;
        case PieceDirection.East:
          shapes.angle = 90
          sprite[i].X += 2
          break;
        case PieceDirection.South:
          shapes.angle = 180
          sprite[i].X += 2
          sprite[i].Y += 2
          break;
        case PieceDirection.West:
          shapes.angle = 270
          sprite[i].Y += 2
          break;
      }
      shapes.x = Space*sprite[i].X;
      shapes.y = Space*sprite[i].Y;
      shapes.scale.x = ((Space*2)/shapes._texture.orig.width)/100
      shapes.scale.y = ((Space*2)/shapes._texture.orig.height)/100
      shapes.interactive = true;
      shapes.buttonMode = true;
      shapes.on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        // events for drag end
        .on('mouseup',this.onDragEnd)
        .on('mouseupoutside',this.onDragEnd)
        .on('touchend',this.onDragEnd)
        .on('touchendoutside',this.onDragEnd)
        // events for drag move
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
      App.stage.addChild(shapes)
    }

  }
  onDragStart(event: any)
  {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.9;
    this.dragging = this.data.getLocalPosition(this.parent);
    //console.log(this.data)
  }

  onDragEnd()
  {
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
    this.position.x = (Pieces.space * Math.floor((this.position.x/ Pieces.space)+0.5))
    this.position.y = (Pieces.space * Math.floor((this.position.y/Pieces.space)+0.5))
  }

  onDragMove()
  {
    if (this.dragging)
    {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x += (newPosition.x - this.dragging.x);
      this.position.y += (newPosition.y - this.dragging.y);
      this.dragging = newPosition;
    }
  }
}
