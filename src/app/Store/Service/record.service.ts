import { Injectable } from '@angular/core';
import {Record} from "../Reducers/records.reducer";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  CHANGELATER(): Record[] {
    return [{name: "test", time: "1:00", nationality: "Dutch", turns: 0},
    {name: "test22", time: "1:20", nationality: "Dutch", turns: 3},
    {name: "test2", time: "1:02", nationality: "Dutch", turns: 4},
  ]}
  constructor(private http: HttpClient) { }
  GetAllRecords(): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()));
  }
  GetUserRecords(): Observable<Record[]>{
    return new Observable(subscriber => subscriber.next(this.CHANGELATER()));
  }
  GetUserRecord(): Observable<Record>{
    return new Observable(subscriber => subscriber.next({name: "test222", time: "1:04", nationality: "Dutch", turns: 84}));
  }
}
