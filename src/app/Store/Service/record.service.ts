import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {TrackRecord} from "../Model/TrackRecord";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  CHANGELATER(): TrackRecord[] {
    return [{userName: "test", time: "1:00", nationality: "Dutch", turns: 0},
    {userName: "test22", time: "1:20", nationality: "Dutch", turns: 3},
    {userName: "test2", time: "1:02", nationality: "Dutch", turns: 4},
  ]}
  constructor(private http: HttpClient) { }
  GetAllRecords(): Observable<TrackRecord[]>{
    console.log("test")
    return this.http.get<TrackRecord[]>("http://localhost:8080/Records/")
  }
  GetUserRecords(): Observable<TrackRecord[]>{
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()));
  }
  GetUserRecord(): Observable<TrackRecord>{
    return this.http.get<TrackRecord>("http://localhost:8080/Records/User/")
  }
}
