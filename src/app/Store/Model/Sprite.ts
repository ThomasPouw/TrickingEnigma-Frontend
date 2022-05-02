import {PieceDirection} from "../../component/game-board/Sprites/piece-direction";

export interface Sprite {
  assetLocation: string,
  id: string
}
export interface LevelSprite{
  x: number,
  y: number,
  tile_name: string,
  id: string,
  rotation: PieceDirection,
  sprite: Sprite,
}
