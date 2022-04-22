import {User} from "./User";

export interface Record{
  courseName?: string;
  time: number | string;
  turns: number;
  nationality?: string;
  userID?: string;
  user?: User
}
