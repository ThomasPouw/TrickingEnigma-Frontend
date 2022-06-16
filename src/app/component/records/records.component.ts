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
  showRecord: boolean = false;
  PB: Record = {recordCreated: 0, turns: 42, time: 0, userID: "", levelID: ""};
  time: string = "";
  turns: boolean = false;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        if(sessionStorage.getItem("userID") != undefined || null){
          this.store.dispatch({type: fromRecord.LOAD_USER_RECORD, userID: sessionStorage.getItem("userID"), levelID: params["id"]})
          this.store.select<Record>(getUserRecord).subscribe(
            Record => {if(Record){this.PB = Record}}
          )
          this.store.select<Record>(getUserRecord).subscribe(
            Record => this.time = (Math.floor(Record.time / 60)) + ":" + ('0' + (Record.time % 60)).slice(-2)
          )
        }

      })
  }
}
