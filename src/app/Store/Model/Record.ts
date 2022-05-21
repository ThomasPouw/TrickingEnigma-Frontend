import {User} from "./User";

export interface Record{
  courseName?: string;
  courseId?: string;
  time: number;
  turns: number;
  userID: string;
  userName?: string;
}
