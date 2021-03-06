import { Component, OnInit } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromUser from "../../Store/Actions/user.actions";
import * as fromNationality from "../../Store/Actions/nationality.actions";
import {getNationalityLogin,getAllNationalities} from "../../Store/Selector/nationality.selector";
import {Nationality} from "../../Store/Model/Nationality";
import {Router} from "@angular/router";
import {getUser} from "../../Store/Selector/user.selector";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nationalities: Nationality[] = [];
  nationality: any;

  constructor(public auth: AuthService, private store: Store<fromRoot.State>, private router: Router) {
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
  }

  ngOnInit(): void {
  }
  SignIn(nickName: string){
    this.auth.user$.subscribe(user =>{
        if(user !== null && user !== undefined){
          this.store.select(getNationalityLogin(this.nationality)).subscribe(
            nationality => {
              if(nationality.id !== ""){
                this.store.dispatch({type: fromUser.ADD_USER, user: {name: nickName, nationality: nationality, secret: user.sub?.replace("|", "_")}})
                this.store.select(getUser).subscribe(
                  user => {
                    if(user !== undefined){
                      if(user.id != undefined){
                        sessionStorage.setItem("userID", user.id)
                        this.router.navigate(['/User'])
                      }
                    }
                  }
                )
              }
            }
          )
        }
    })
  }
}
