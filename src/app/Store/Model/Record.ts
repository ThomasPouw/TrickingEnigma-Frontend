import {User} from "./User";

export interface Record{
  courseName?: string;
  time: number | string;
  turns: number;
  userID?: string;
}
