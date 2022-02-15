import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {destinations} from "../router-destinations";

const routes: Routes = [];

function arrayMaker(): Routes {
  destinations.forEach(value => {
    routes.push({path: value.Path, component: value.Component})
  })
  return routes;
}
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(arrayMaker())
  ],
  exports: [RouterModule]

})
export class URLrouterModule { }
