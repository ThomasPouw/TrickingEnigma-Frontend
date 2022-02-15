import {Located} from "./located";
import {AppComponent} from "../app.component";
import {GameBoardComponent} from "../Game/game-board/game-board.component";
export interface routePlan{
  Path: string,
  ShowName: string,
  Component: any,
  ExtraRoute?: [Path: string, ShowName: string, Permission: [], Component?: Object]
  Located: Located,
  Permission: []
}

export const destinations: routePlan[] = [
    {Path: "/", ShowName: "Home", Component: AppComponent,Located: Located.Both, Permission: []},
    {Path: "/Game", ShowName: "Game", Component: GameBoardComponent, Located: Located.Top,Permission: []},
    {Path: "/Admin", ShowName: "Admin", Component: GameBoardComponent, Located: Located.Top, Permission: []},
    {Path: "/User", ShowName: "User", Component: GameBoardComponent, Located: Located.Top, Permission: []}
  ]

