import {Component, Inject, OnInit} from '@angular/core';
import {destinations} from "../../Route/router-destinations";
import {Located} from "../../Route/located";
import {AuthService} from "@auth0/auth0-angular";
import { DOCUMENT } from '@angular/common';
import signJWT from "../../Util/JWT/signJWT";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromUser from "../../Store/Actions/user.actions";
import {getUser} from "../../Store/Selector/user.selector";
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
      console.log(authUser)
      if(authUser !== undefined && authUser !== null) {
        store.dispatch({type: fromUser.LOAD_USER_LOGIN, secret: authUser.sub?.replace("|", "_")});
        store.select(getUser).subscribe(
          user => {
            if(user !== undefined){
              signJWT(user)
              this.router.navigate(['/User/'+user.id])
            }
          }
        )
      }
    })
  }

  ngOnInit(): void {
  }

}
