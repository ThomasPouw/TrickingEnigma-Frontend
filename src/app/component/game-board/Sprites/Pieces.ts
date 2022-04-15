import * as Pixi from 'pixi.js';
import {PieceDirection} from "./piece-direction";
import {GameBoardComponent} from "../game-board.component";
import {Sprite, LevelSprite} from "../../../Store/Model/Sprite";

export class Pieces extends Pixi.Sprite{
  private dragging: any;
  private data: any;
  private static space: number =0;
  private static InteractionManager: Pixi.InteractionManager;
  constructor(App: Pixi.Application, Space: number) {
    super()
    App.stage.addChild(this.SpriteMaker(App, Space, [
      {X: 9, Y: 2, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Plank-vorm.png', rotation: PieceDirection.North}, collection: "End"},
      {X: 6, Y: 3, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Block-vorm.png', rotation: PieceDirection.North}, collection: "End"},
      {X: 6, Y: 1, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Big_Block-vorm.png', rotation: PieceDirection.North}, collection: "Sprite"},
      {X: 4, Y: 0, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Plank-vorm.png', rotation: PieceDirection.North}, collection: "Sprite"},
      {X: 5, Y: 2, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Block-vorm.png', rotation: PieceDirection.North}, collection: "Cargo"},
      {X: 9, Y: 0, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Plank-vorm.png', rotation: PieceDirection.North}, collection: "Cargo"},
      {X: 9, Y: 2, id: "gghfrgg", sprite: {id: "dhfhdfhffhe", assetLocation:'assets/Plank-vorm.png', rotation: PieceDirection.East}, collection: "Cargo"},

    ]))
    console.log(App.stage)
    Pieces.InteractionManager = new Pixi.InteractionManager(App.renderer)
  }
  SpriteMaker(App: any, Space: number, sprite: LevelSprite[]): Pixi.Container{
    let Container = new Pixi.Container;
    Pieces.space = Space;
    for(let i = 0; i < sprite.length; i++){
      let shapes= Pixi.Sprite.from(sprite[i].sprite.assetLocation);
      shapes.anchor.set(0,0)
      switch(sprite[i].sprite.rotation){
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
      shapes.scale.x = ((Space*2)/shapes._texture.orig.width)/100
      shapes.scale.y = ((Space*2)/shapes._texture.orig.height)/100
      shapes.x = Space*sprite[i].X;
      shapes.y = Space*sprite[i].Y;
      shapes.alpha = 1
      //shapes.anchor.set(0.5)
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
          break;
        case("Cargo"):
          shapes.tint=0xA75325;
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
      shapes.interactive = true;
      shapes.buttonMode = true;
      console.log(shapes)
      Container.addChild(shapes)
    }
    return Container;
  }
  onDragStart(event: any)
  {
    this.data = event.data;
    this.alpha = 0.9;
    this.dragging = this.data.getLocalPosition(this.parent);
  }

  onDragEnd()
  {
    this.alpha = 1;

    this.dragging = false;
    // set the interaction data to null
    this.data = null;
    this.position.x = (Pieces.space * Math.floor((this.position.x/ Pieces.space)+0.5))
    this.position.y = (Pieces.space * Math.floor((this.position.y/Pieces.space)+0.5))
    GameBoardComponent.turnCount++
    for(let sprite in this.parent.children){
      if(sprite.length != this.parent.children.length){
        if(this !== this.parent.children[sprite]){
          if(this.parent.children[sprite].name == "End"){
            if(Pieces.Interaction(this, this.parent.children[sprite])){
              let endBlock = this.parent.children[sprite]
              if(this.name == "Cargo"){
                let sprite1 = this.getBounds();
                let sprite2 = this.parent.children[sprite].getBounds()
                if(sprite1.x + sprite1.width == sprite2.x + sprite2.width &&
                  sprite1.x == sprite2.x &&
                  sprite1.y + sprite1.height == sprite2.y + sprite2.height &&
                  sprite1.y == sprite2.y){
                  console.log("right thing!")
                }
                else
                console.log("right thing, but wromg size")
              }

              else
                console.log("wrong thing!")
            }
            }
            //if(newPosition.x - Pieces.space > oldX && newPosition.x  + Pieces.space < oldX && newPosition.y - Pieces.space > oldY && newPosition.y  + Pieces.space < oldY){
            //  this.onDragEnd();
            //}
          }
        }
      }
  }

  static Interaction(a: Pixi.Sprite, b: any){
    let aBox = a.getBounds()
    let bBox = b.getBounds()
    return  aBox.x + aBox.width > bBox.x &&
            aBox.x < bBox.x + bBox.width &&
            aBox.y + aBox.height > bBox.y &&
            aBox.y < bBox.y + bBox.height;


  }
  onDragMove()
  {
    if (this.dragging)
    {
      let newPosition = this.data.getLocalPosition(this.parent);
      let oldX = this.position.x;
      let oldY =this.position.y;
      this.position.x += (newPosition.x - this.dragging.x);
      this.position.y += (newPosition.y - this.dragging.y);
      for(let sprite in this.parent.children){
        if(sprite.length != this.parent.children.length){
          if(this !== this.parent.children[sprite]){
            if(this.parent.children[sprite].name != "End"){
              if(Pieces.Interaction(this, this.parent.children[sprite])){
                this.position.x = oldX;
                this.position.y = oldY;
              }
              //if(newPosition.x - Pieces.space > oldX && newPosition.x  + Pieces.space < oldX && newPosition.y - Pieces.space > oldY && newPosition.y  + Pieces.space < oldY){
              //  this.onDragEnd();
              //}
            }
          }
        }
      }
      this.dragging = newPosition;
    }
  }
}
