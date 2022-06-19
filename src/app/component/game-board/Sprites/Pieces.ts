import * as Pixi from 'pixi.js';
import {PieceDirection} from "./piece-direction";
import {GameBoardComponent} from "../game-board.component";
import {Sprite, LevelSprite} from "../../../Store/Model/Sprite";
export class Pieces extends Pixi.Sprite{
  private dragging: any;
  private data: any;
  private static space: number =0;
  private static InteractionManager: Pixi.InteractionManager;
  private static App: Pixi.Application
  private static active: boolean = false;
  constructor(App: Pixi.Application, Space: number, Sprites: LevelSprite[]) {
    super()
    App.stage.addChild(this.SpriteMaker(App, Space, Sprites))
    Pieces.App= App;
    Pieces.InteractionManager = new Pixi.InteractionManager(App.renderer)
  }
  SpriteMaker(App: any, Space: number, sprite: LevelSprite[]): Pixi.Container{
    let Container = new Pixi.Container;
    Container.sortableChildren = true
    Pieces.space = Space;
    for(let i = 0; i < sprite.length; i++){
      let shapes= Pixi.Sprite.from(sprite[i].sprite.assetLocation);
      shapes.anchor.set(0,0)
      shapes.scale.x = (Space*2)/100
      shapes.scale.y = (Space*2)/100
      switch(sprite[i].rotation){
        case PieceDirection.North:
          shapes.x = Space*sprite[i].x;
          shapes.y = Space*sprite[i].y;
          break;
        case PieceDirection.East:
          shapes.angle = 90
          shapes.x = Space*sprite[i].x+2;
          shapes.y = Space*sprite[i].y;
          break;
        case PieceDirection.South:
          shapes.angle = 180
          shapes.x = Space*sprite[i].x+2;
          shapes.y = Space*sprite[i].y+2;
          break;
        case PieceDirection.West:
          shapes.angle = 270
          shapes.x = Space*sprite[i].x;
          shapes.y = Space*sprite[i].y+2;
          break;
      }
      shapes.alpha = 1
      shapes.name = sprite[i].tile_name;
      switch(sprite[i].tile_name){
        case("End"):
          shapes.zIndex = 0;
          shapes.tint=0x00FF00;
          break;
        case("Sprite"):
          shapes.zIndex = 1;
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
          shapes.zIndex = 2;
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
          break;
        case("Wall"):
          shapes.zIndex = 4;
          shapes.tint=0x808080;
          break;
      }
      shapes.interactive = true;
      shapes.buttonMode = true;
      Container.addChild(shapes)
    }
    return Container;
  }
  onDragStart(event: any)
  {
    if(!GameBoardComponent.start){
        GameBoardComponent.counter(!GameBoardComponent.start)
    }
    this.data = event.data;
    this.alpha = 0.9;
    this.dragging = this.data.getLocalPosition(this.parent);
    Pieces.active = true;
  }

  onDragEnd()
  {
    if(Pieces.active){
      this.alpha = 1;
      this.dragging = false;
      GameBoardComponent.turnCount++
      // set the interaction data to null
      this.data = null;
      this.position.x = (Pieces.space * Math.floor((this.position.x/ Pieces.space)+0.5))
      this.position.y = (Pieces.space * Math.floor((this.position.y/Pieces.space)+0.5))
      Pieces.active = false;
      for(let sprite in this.parent.children){
        if(sprite.length != this.parent.children.length){
          if(this !== this.parent.children[sprite]){
            if(this.parent.children[sprite].name == "End"){
              if(Pieces.Interaction(this, this.parent.children[sprite])){
                if(this.name == "Cargo"){
                  let sprite1 = this.getBounds();
                  let sprite2 = this.parent.children[sprite].getBounds()
                  if(sprite1.x + sprite1.width == sprite2.x + sprite2.width &&
                    sprite1.x == sprite2.x &&
                    sprite1.y + sprite1.height == sprite2.y + sprite2.height &&
                    sprite1.y == sprite2.y){
                    GameBoardComponent.counter(!GameBoardComponent.start)
                    for(let sprite of this.parent.children){
                      sprite.removeAllListeners()
                    }
                    GameBoardComponent.recordStore()
                  }
                }
              }
            }
          }
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
                switch (this.angle){ //Needs to be checked because the x and y values are calculated from a different points.
                  case(90):
                    if(Pieces.Interaction(this, this.parent.children[sprite])||this.x <= 0 + this.width|| this.y <= 0 || this.x >= Pieces.App.view.width||  this.y >= Pieces.App.view.height- this.height){
                      this.position.x = oldX;
                      this.position.y = oldY;
                    }
                    break;
                  case(180):
                    if(Pieces.Interaction(this, this.parent.children[sprite])||this.x <= 0 + this.width|| this.y <= 0 + this.height|| this.x >= Pieces.App.view.width||  this.y >= Pieces.App.view.height){
                      this.position.x = oldX;
                      this.position.y = oldY;
                    }
                    break;
                  case(270):
                    if(Pieces.Interaction(this, this.parent.children[sprite])||this.x <= 0 || this.y <= 0+ this.height || this.x >= Pieces.App.view.width - this.width||  this.y >= Pieces.App.view.height){
                      this.position.x = oldX;
                      this.position.y = oldY;
                    }
                    break;
                  default:
                    if(Pieces.Interaction(this, this.parent.children[sprite])||this.x <= 0 || this.y <= 0|| this.x >= Pieces.App.view.width- this.width||  this.y >= Pieces.App.view.height- this.height){
                      this.position.x = oldX;
                      this.position.y = oldY;
                    }
                    break;
                }
            }
          }
        }
      }
      this.dragging = newPosition;
    }
  }
}
