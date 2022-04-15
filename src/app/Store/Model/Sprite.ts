import {PieceDirection} from "../../component/game-board/Sprites/piece-direction";

export interface Sprite {
  assetLocation: string,
  rotation: PieceDirection,
  id: string
}
export interface LevelSprite{
  X: number,
  Y: number,
  collection: string,
  id: string,
  sprite: Sprite
}
