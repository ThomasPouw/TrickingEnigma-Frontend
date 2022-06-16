import {Located} from "./located";
import {AppComponent} from "../app.component";
import {UserPageComponent} from "../view/user-page/user-page.component";
import {GamePageComponent} from "../view/game-page/game-page.component";
import {AdminPageComponent} from "../view/admin-page/admin-page.component";
import {LoginComponent} from "../view/login/login.component";
import {GameSelectComponent} from "../view/game-select/game-select.component";

export interface routePlan{
  Path: string,
  ShowName: string,
  Component: any,
  ExtraRoute?: [Path: string, ShowName: string, Permission: [], Component?: Object]
  Located: Located,
  Permission: string[]
}

export const destinations: routePlan[] = [
    {Path: "", ShowName: "Home", Component: AppComponent,Located: Located.Both, Permission: []},
    {Path: "Game/:id", ShowName: "Game", Component: GamePageComponent, Located: Located.Neither,Permission: []},
    {Path: "GameSelect", ShowName: "GameSelect", Component: GameSelectComponent, Located: Located.Top,Permission: []},
    {Path: "Admin", ShowName: "Admin", Component: AdminPageComponent, Located: Located.Top, Permission: ["33fe0ee2-3b94-4e9d-82ab-434d08650967"]},
    {Path: "User", ShowName: "User", Component: UserPageComponent, Located: Located.Top, Permission: []},
  {Path: "Login", ShowName: "Login", Component: LoginComponent, Located: Located.Neither, Permission: []}
  ]

