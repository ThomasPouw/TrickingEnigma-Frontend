import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Model/User";

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
    return this.http.get<User>("http://localhost:8060/User/"+id,{headers: {'Access-Control-Allow-Origin' : "http://localhost:4200"}})
  }
  PostUser(user: User): Observable<User>{
    console.log(user)
    return this.http.post<User>("http://localhost:8060/User", user)
  }
}
