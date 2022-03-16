import {Sprite} from "./Sprite";

export interface Level {
  ID: string;
  StageName: string;
  Sprites: Sprite[]
}

