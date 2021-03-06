import {Component, Inject, OnInit} from '@angular/core';
import {destinations} from "../../Route/router-destinations";
import {Located} from "../../Route/located";
import {AuthService} from "@auth0/auth0-angular";
import { DOCUMENT } from '@angular/common';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromUser from "../../Store/Actions/user.actions";
import {Router} from "@angular/router";
(window as any).global = window;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Destinations = destinations;
  Located = Located;
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private store: Store<fromRoot.State>, private router: Router) {
    auth.user$.subscribe((authUser) => {
      if(authUser !== undefined && authUser !== null) {
        store.dispatch({type: fromUser.LOAD_USER_LOGIN, secret: authUser.sub?.replace("|", "_")});
      }
    })
  }
sessionStore(): string{
  let session = sessionStorage.getItem("userID")
  if(typeof session == "string")
    return session
  else return "";
}
  ngOnInit(): void {
  }

}
