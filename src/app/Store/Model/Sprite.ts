import {PieceDirection} from "../../component/game-board/Sprites/piece-direction";

export interface Sprite {
  X: number,
  Y: number,
  assetLocation: string,
  side: PieceDirection,
  collection: string,
  hitbox?: number[],
}
