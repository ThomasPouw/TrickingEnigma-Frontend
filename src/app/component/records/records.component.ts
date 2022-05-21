import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import {getUserRecord} from "../../Store/Selector/records.selector";
import * as fromRecord from "../../Store/Actions/records.actions";
import {Record} from "../../Store/Model/Record";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  Showrecord: boolean = false;
  PB: Record = {turns: 42, time: 0, userID: ""};
  time: string = "";

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.params)
    this.route.params
      .subscribe(params => {
        this.store.dispatch({type: fromRecord.LOAD_USER_RECORD, userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967", levelID: params["id"]})
        this.store.select<Record>(getUserRecord).subscribe(
          Record => {if(Record){this.PB = Record}}
        )
        this.store.select<Record>(getUserRecord).subscribe(
          Record => this.time = (Math.floor(Record.time / 60)) + ":" + ('0' + (Record.time % 60)).slice(-2)
        )
      })
  }
}
