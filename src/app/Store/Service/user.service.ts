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

  GetUserByID(id: string): Observable<User>{
    return this.http.get<User>("http://localhost:8060/User/S?secret="+id)
  }
  PostUser(user: User): Observable<User>{
    console.log(user)
    return this.http.post<User>("http://localhost:8060/User/", user)
  }
}
