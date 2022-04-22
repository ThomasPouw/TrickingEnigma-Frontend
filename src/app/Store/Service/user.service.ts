import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../Model/Level";
import {User} from "../Model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  GetUsers(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8080/Users/")
  }

  GetUserByID(id: string): Observable<User>{
    return this.http.get<User>("http://localhost:8080/Users")
  }
}
