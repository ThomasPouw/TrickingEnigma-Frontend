import {Component, Inject, OnInit} from '@angular/core';
import {destinations} from "../../Route/router-destinations";
import {Located} from "../../Route/located";
import {AuthService} from "@auth0/auth0-angular";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Destinations = destinations;
  Located = Located;
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
  }

}
