import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import {getUserRecord} from "../../Store/Selector/records.selector";
import * as fromRecord from "../../Store/Actions/records.actions";
import {Record} from "../../Store/Model/Record";
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  Showrecord: boolean;
  PB: Record = {turns: 42, time: 0};

  constructor(private store: Store<fromRoot.State>) {
    this.Showrecord = false
    store.dispatch({type: fromRecord.LOAD_USER_RECORD})
    store.select<Record>(getUserRecord).subscribe(
      //TrackRecord => this.PB = this.Record(TrackRecord)
    )
  }

  ngOnInit(): void {
  }

  /*Record(record: Record): Record{
    if(typeof record.time == "number"){
      return {
        record.user?.userName: record.user?.userName,
        time: (Math.floor(record.time/60)) +":"+ ('0' + (record.time % 60)).slice(-2),
        turns: record.turns,
      }
    }
    return {
      userName: record.userName,
      time: record.time,
      turns: record.turns,
    }*/
  //}
}
