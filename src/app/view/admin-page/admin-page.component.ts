import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthModule, AuthService, User} from "@auth0/auth0-angular";
import {Token} from "../../Util/API_Token";
import {Nationality} from "../../Store/Model/Nationality";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromNationality from "../../Store/Actions/nationality.actions";
import {getAllNationalities} from "../../Store/Selector/nationality.selector";

@Component({
  selector: 'app-root',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit {
  nationalities: Nationality[] = [];
  nationalityID: any;
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
  }


  ngOnInit(): void {
  }
  Add_Nationality(nationality_name: string){
    this.store.dispatch({type: fromNationality.POST_NATIONALITY, nationality: {name: nationality_name}})
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
  }
  Edit_Nationality(nationality_name: string){
    this.store.dispatch({type: fromNationality.Edit_NATIONALITY, nationality: {name: nationality_name, id: this.nationalityID}})
    this.store.dispatch({type: fromNationality.LOAD_All_NATIONALITY})
    this.store.select(getAllNationalities).subscribe(
      nationalities => this.nationalities = nationalities
    )
  }

}
