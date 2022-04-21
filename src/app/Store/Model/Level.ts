import {LevelSprite} from "./Sprite";

export interface Level {
  iD: string;
  name: string;
  levelSprite: LevelSprite[];
  horizon_tile: number;
  vertical_tile: number;
}

