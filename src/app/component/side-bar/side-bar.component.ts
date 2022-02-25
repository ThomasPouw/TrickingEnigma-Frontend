import { Component, OnInit } from '@angular/core';
import {destinations} from "../../Route/router-destinations";
import {Located} from "../../Route/located";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  Destinations = destinations;
  Located = Located;
  constructor() { }

  ngOnInit(): void {
  }

}
