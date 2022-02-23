import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {destinations} from "../router-destinations";

const routes: Routes = [];

function route(): Routes {
  destinations.forEach(value => {
    routes.push({path: value.Path, component: value.Component})
  })
  return routes;
}
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route())
  ],
  exports: [RouterModule]

})
export class URLrouterModule { }
