import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Nationality} from "../Model/Nationality";

@Injectable({
  providedIn: 'root'
})
export class NationalityService {
  constructor(private http: HttpClient) { }
  GetNationalities(): Observable<Nationality[]>{

    return this.http.get<Nationality[]>("http://localhost:8060/Nationality", {headers: {'Access-Control-Allow-Origin' : "http://localhost:4200"}});
  }

  GetNationalityByID(id: string): Observable<Nationality>{
    return this.http.get<Nationality>("http://localhost:8060/Nationality/");
  }
}
