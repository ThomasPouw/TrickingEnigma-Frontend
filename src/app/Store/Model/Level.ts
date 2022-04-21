import {LevelSprite} from "./Sprite";

export interface Level {
  iD: string;
  name: string;
  levelSprite: LevelSprite[]
}

