import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "@auth0/auth0-angular";
import {Token} from "../../Util/API_Token";

@Component({
  selector: 'app-root',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit {
  public role_List: any = []
  public people_List: User[] = []
  constructor(private http: HttpClient) {
    this.http.get('https://dev-yw9oh5an.us.auth0.com/api/v2/roles', {
      headers: {
        authorization: 'Bearer '+ new Token(this.http).API_Token()
      }
    }).subscribe(
      role => {
        this.role_List = role;
        console.log(this.role_List)
        console.log(role);
      }
    )
  }

  ngOnInit(): void {
  }
  Add_Role(){

  }
  Remove_Role(){

  }
}
