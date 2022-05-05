import {Nationality} from "./Nationality";

export interface User{
  id?: string;
  name: string;
  secret?: string
  nationality: Nationality;
}
