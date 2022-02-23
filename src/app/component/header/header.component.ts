import { Component, OnInit } from '@angular/core';
import {destinations} from "../../Route/router-destinations";
import {Located} from "../../Route/located";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Destinations = destinations;
  Located = Located;
  constructor() { }

  ngOnInit(): void {
  }

}
