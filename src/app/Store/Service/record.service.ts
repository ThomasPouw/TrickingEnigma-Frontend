import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Record} from "../Model/Record";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private http: HttpClient, private userService: UserService) { }
  GetAllRecords(): Observable<Record[]>{
    return this.http.get<Record[]>("http://localhost:8040/Records/")
  }
  GetUserRecords(userID: string): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next());
  }
  // @ts-ignore
  GetUserRecord(userID: string, levelID: string): Observable<Record>{
    try{
      this.http.get<Record>("http://localhost:8040/Records/").subscribe(record => {
        if(typeof record.userID == "string"){
          this.userService.GetUserByID(record.userID).subscribe(user => record.user = user)
          record.userID = undefined;
        }
        console.log(record)
        return new Observable<Record>(sub => sub.next(record))
      })
    }
    catch(E){
      console.error(E)
    }
  }
  GetRecordsByNationality(levelID: string, nationality_id: string): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next());
  }
}
