import {Component, Input, OnInit} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import * as fromRecord from "../../Store/Actions/records.actions"
import {Store} from "@ngrx/store";
import {getAllRecords} from "../../Store/Selector/records.selector";
import {TrackRecord} from "../../Store/Model/TrackRecord";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  record$: TrackRecord[] = []
  displayedColumns: string[] = [];
  constructor(private store: Store<fromRoot.State>) {
    store.dispatch({type: fromRecord.LOAD_WORLDRECORDS})
    store.select<TrackRecord[]>(getAllRecords).subscribe(
      TrackRecord => this.record$ = TrackRecord
    )
    this.displayedColumns = ColumnNames(this.record$[0])
  }
  ngOnInit() {

  }
  timeConvert(time: number | string){
    if(typeof time == "string"){
      return time;
    }
    return (Math.floor(time/60)) +":"+ ('0' + (time % 60)).slice(-2)
  }
}
function ColumnNames(recordFile: object): string[]{
  let Names: string[] = []
  for(let key in recordFile){
    Names.push(key)
  }
  return Names;
}

