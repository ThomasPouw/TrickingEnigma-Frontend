import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TrackRecord} from "../Reducers/records.reducer";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  CHANGELATER(): TrackRecord[] {
    return [{name: "test", time: "1:00", nationality: "Dutch", turns: 0},
    {name: "test22", time: "1:20", nationality: "Dutch", turns: 3},
    {name: "test2", time: "1:02", nationality: "Dutch", turns: 4},
  ]}
  constructor() { }
  GetAllRecords(): Observable<TrackRecord[]>{
    console.log("test")
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()));
  }
  GetUserRecords(): Observable<TrackRecord[]>{
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()));
  }
  GetUserRecord(): Observable<TrackRecord>{
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()[1]));
  }
}
