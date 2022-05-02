import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Record} from "../Model/Record";
import {UserService} from "./user.service";
import {User} from "../Model/User";

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
      return this.http.get<Record>("http://localhost:8040/Records/")
    }
    catch(E){
      console.error(E)
    }
  }
  GetRecordsByNationality(levelID: string, nationality_id: string): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next());
  }
  PostRecord(record: Record): Observable<Record>{
    return this.http.post<Record>("http://localhost:8040/Records/", record)
  }
}
