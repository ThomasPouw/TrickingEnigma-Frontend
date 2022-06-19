import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import * as fromNationality from "../../Store/Actions/nationality.actions";
import * as fromUser from "../../Store/Actions/user.actions";
import {getAllNationalities, getNationalityLogin} from "../../Store/Selector/nationality.selector";
import {Nationality} from "../../Store/Model/Nationality";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import {getUser} from "../../Store/Selector/user.selector";
import {Load_User} from "../../Store/Actions/user.actions";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../Store/Model/User";
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  nationalities: Nationality[] = [];
  nationality: any;
  user: User = {name: "", nationality: {id: "", name: ""}};
  constructor(private _ngZone: NgZone, private store: Store<fromRoot.State>,private route: ActivatedRoute) {
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
    this.store.dispatch({type: fromUser.LOAD_USER, userID: sessionStorage.getItem("userID")})
    this.store.select(getUser).subscribe(
      user => this.user = user
    )
  }

  ngOnInit(): void {
    }

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    if(this.autosize != undefined){
      //this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    }
  }
  editUser(nickName: string){
    this.route.params
      .subscribe(params => {
        this.store.dispatch({type: fromUser.LOAD_USER, userID: sessionStorage.getItem("userID")});
        this.store.select<User>(getUser).subscribe(
          user => {
            if(user !== undefined){
              this.store.select(getNationalityLogin(this.nationality)).subscribe(
                nationality => {
                  let newUser = user;
                  newUser.name = nickName.toString();
                  newUser.nationality = nationality;
                  this.store.dispatch({type: fromUser.EDIT_USER, user: newUser});
                }
              )
            }
          }
        )
      })
  }
}
