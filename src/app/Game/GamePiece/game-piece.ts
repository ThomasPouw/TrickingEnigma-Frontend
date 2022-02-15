import {PieceDirection} from "./piece-direction";
import {Graphics, Container} from "pixi.js";
import "pixi-plugin-bump";

export class GamePiece {
  hitdetection(ControlledSprite: Graphics, Collision: Container): boolean{
    let B = new PIXI.extras.Bump();
    let Con: Container = Collision;
    Con.removeChild(ControlledSprite)
    return B.hit(ControlledSprite, Con.children, true, true, false, function(){})
  }
  rotate(rotation: PieceDirection, Sprite: Graphics): Graphics{
    switch(rotation){
      case PieceDirection.North:
        return Sprite;
      case PieceDirection.East:
        Sprite.rotation = 90
        return Sprite;
      case PieceDirection.South:
        Sprite.rotation = 180
        return Sprite;
      case PieceDirection.West:
        Sprite.rotation = 270
        return Sprite;
    }
  }
}
