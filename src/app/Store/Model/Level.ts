import {LevelSprite} from "./Sprite";

export interface Level {
  id: string;
  name: string;
  levelSprite: LevelSprite[];
  x_length: number;
  y_length: number;
}

