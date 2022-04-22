import {Nationality} from "./Nationality";

export interface User{
  id: string;
  userName: string;
  secret?: string
  nationality: Nationality;
}
