import {LevelSprite} from "./Sprite";

export interface Level {
  iD: string;
  name: string;
  levelSprite: LevelSprite[];
  x_length: number;
  y_length: number;
}

