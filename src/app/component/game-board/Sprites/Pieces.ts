import * as Pixi from 'pixi.js'
//import "pixi-plugin-bump";
import {PieceDirection} from "./piece-direction";
import {GameBoardComponent} from "../game-board.component";
import {DisplayObject} from "pixi.js";

interface Sprite {
  X: number,
  Y: number,
  assetLocation: string,
  side: PieceDirection,
  collection: string,
  hitbox: number[],
}
export class Pieces extends Pixi.Sprite{
  private dragging: any;
  private data: any;
  private static space: number =0;
  private static Endpoint = Pixi.Sprite;
  constructor(App: Pixi.Application, Space: number) {
    super()
    this.SpriteMaker(App, Space, [
      {X: 6, Y: 3, assetLocation:'assets/Block-vorm.png', side: PieceDirection.North, collection: "End", hitbox: [0,2,1,2,1,4,2,4,2,5,0,5]},
      {X: 3, Y: 0, assetLocation:'assets/L-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [3,2,4,2,4,3,5,3,5,4,3,4]},
      {X: 0, Y: 1, assetLocation:'assets/U-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [6,2,7,2,7,3,8,3,8,4,7,4,7,5,6,5]}, // [16,2,19,2,19,4,18,4,18,3,17,3,17,4,16,4]
      {X: 6, Y: 1, assetLocation:'assets/Big_Block-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [6,2,7,2,7,3,8,3,8,4,7,4,7,5,6,5]},
      {X: 5, Y: 2, assetLocation:'assets/Block-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [9,2,10,2,10,4,11,4,11,5,9,5]},
      {X: 0, Y: 0, assetLocation:'assets/T-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [12,2,13,2,13,6,12,6]},
      {X: 4, Y: 0, assetLocation:'assets/Plank-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: [14,2,15,2,15,3,14,3]},
      {X: 4, Y: 2, assetLocation:'assets/short_L-vorm.png', side: PieceDirection.North, collection: "Sprite", hitbox: []},
      {X: 2, Y: 2, assetLocation:'assets/short_L-vorm.png', side: PieceDirection.West, collection: "Sprite", hitbox: []},
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
      shapes.name = sprite[i].collection;
      switch(sprite[i].collection){
        case("End"):
          shapes.tint=0x475325;
          break;
        case("Sprite"):
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
      }
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
    console.log(this)
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
    console.log(this.parent.children)
    for(let sprite in this.parent.children){
      if(sprite.length != this.parent.children.length){
        if(this.parent.children[sprite].name == "End"){
          console.log(this.vertexData)
          console.log(this)
          console.log(typeof this.parent.children[sprite])
          console.log(this.parent.children[sprite]._bounds)
          if(Pieces.Interaction(this.parent.children[sprite], this)){
            console.log("hit!")
          }
          else{
          console.log("Miss!")
          }
        }
      }
    }
    GameBoardComponent.turnCount++
  }

  static Interaction(a: any, b: Pixi.Sprite){
    let aBox= a.getBounds()
    let bBox = b.getBounds();
    return aBox.x + aBox.width > bBox.x &&
      aBox.x < bBox.x + bBox.width &&
      aBox.y + aBox.height > bBox.y &&
      aBox.y <bBox.y + bBox.height;

  }
  onDragMove()
  {
    if (this.dragging)
    {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x += (newPosition.x - this.dragging.x);
      this.position.y += (newPosition.y - this.dragging.y);
      this.dragging = newPosition;
      //let b = new PIXI.extras.Bump();
    }
  }
}
