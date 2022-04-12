import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../Model/Level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(private http: HttpClient) { }
  GetLevel(): Observable<Level>{
    return this.http.get<Level>("http://localhost:8080/Level/")
  }
}
