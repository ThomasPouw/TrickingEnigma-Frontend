import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import {getUserRecord} from "../../Store/Selector/records.selector";
import * as fromRecord from "../../Store/Actions/records.actions";
import {TrackRecord} from "../../Store/Model/TrackRecord";
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  Showrecord: boolean;
  PB: TrackRecord = {userName: "", turns: 42, time: "0:00"};
  constructor(private store: Store<fromRoot.State>) {
    this.Showrecord = false
    store.dispatch({type: fromRecord.LOAD_USER_RECORD})
    store.select<TrackRecord>(getUserRecord).subscribe(
      TrackRecord => this.PB = TrackRecord
    )
  }
  ngOnInit(): void {
  }
}
