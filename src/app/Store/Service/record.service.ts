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
  GetRecordsByLevel(levelID: string): Observable<Record[]>{
    return this.http.get<Record[]>("http://localhost:8040/Records/Level", {params: {Level_ID: levelID}})
  }
  GetUserRecords(userID: string): Observable<Record[]>{
    return this.http.get<Record[]>("http://localhost:8040/Records/User", {params: {User_ID: userID}})
  }
  GetUserRecord(userID: string, levelID: string): Observable<Record>{
    return this.http.get<Record>("http://localhost:8040/Records/Level/User", {params: {Level_ID: levelID, User_ID: userID}})
  }
  GetRecordsByNationality(levelID: string, nationality_id: string): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next());
  }
  PostRecord(record: Record): Observable<Record>{
    return this.http.post<Record>("http://localhost:8040/Records/", record)
  }
}
