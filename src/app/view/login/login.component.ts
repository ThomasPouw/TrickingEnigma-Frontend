import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromUser from "../../Store/Actions/user.actions";
import * as fromNationality from "../../Store/Actions/nationality.actions";
import {getNationalityLogin,getAllNationalities} from "../../Store/Selector/nationality.selector";
import {Nationality} from "../../Store/Model/Nationality";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nationalities: Nationality[] = [];
  nationality: any;

  constructor(public auth: AuthService, private store: Store<fromRoot.State>) {
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
  }

  ngOnInit(): void {
  }
  SignIn(nickName: string){
    console.log(this.nationality)
    console.log(nickName)
    this.auth.user$.subscribe(user =>{
        if(user !== null && user !== undefined){
          this.store.select(getNationalityLogin(this.nationality)).subscribe(
            nationality => {
              this.store.dispatch({type: fromUser.ADD_USER, user: {userName: nickName, nationality: nationality, secret: user.sub?.replace("|", "_")}})
            }
          )
        }
    })
  }
}
