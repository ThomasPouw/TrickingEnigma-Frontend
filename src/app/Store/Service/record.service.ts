import { Injectable } from '@angular/core';
import {Record} from "../Reducers/records.reducer";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }
  GetAll(): Observable<Record[]>{
    return new Observable(undefined);
  }
}
