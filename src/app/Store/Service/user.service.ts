import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Model/User";
import {ObservablePoint} from "pixi.js";
import {Token} from "../../Util/API_Token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  GetUsers(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8060/Users/")
  }

  GetUserLogin(id: string): Observable<User>{
    return this.http.get<User>(encodeURI("http://localhost:8060/User/S?secret="+id),{headers: {'Access-Control-Allow-Origin' : "http://localhost:4200"}})
  }
  GetUserByID(id: string): Observable<User>{
    return this.http.get<User>("http://localhost:8060/User/?ID="+id)
  }
  GetUsersByID(id: string[]): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8060/User/Level?user_IDs="+id,{headers: {'Access-Control-Allow-Origin' : "http://localhost:4200"}})
  }
  GetUsersByIDAndNationalityID(user_IDs: string[],nationality_ID: string): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8060/User/Level?user_IDs="+user_IDs+"?nationality_ID="+ nationality_ID,{headers: {'Access-Control-Allow-Origin' : "http://localhost:4200"}})
  }
  PostUser(user: User): Observable<User>{
    return this.http.post<User>("http://localhost:8060/User", user)
  }
  EditUser(user: User): Observable<User>{
    return this.http.put<User>("http://localhost:8060/User", user)
  }
}
