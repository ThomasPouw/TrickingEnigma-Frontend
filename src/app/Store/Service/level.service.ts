import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../Model/Level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(private http: HttpClient) { }
  GetLevels(): Observable<Level[]>{
    return this.http.get<Level[]>("http://localhost:8080/Level/")
  }

  GetLevelByID(id: string): Observable<Level>{
    return this.http.get<Level>("http://localhost:8080/Level/Single?id="+id)
  }
  GetLevelsByID(levelIDs: string[]): Observable<Level[]>{
    return this.http.get<Level[]>("http://localhost:8080/Level/Record", {params: {levelIDs: levelIDs}})
  }
}
