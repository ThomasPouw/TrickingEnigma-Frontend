import {User} from "./User";

export interface Record{
  recordCreated: string;
  levelName?: string;
  levelID: string;
  time: number;
  turns: number;
  userID: string;
  userName?: string;
  nationality?: string;
}
