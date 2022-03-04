import {Component, Input, OnInit} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import * as fromRecord from "../../Store/Actions/records.actions"
import {Store} from "@ngrx/store";
import {getRecords, TrackRecord} from "../../Store/Reducers/records.reducer";
import {getAllRecords} from "../../Store/Selector/records.selector";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  record$: TrackRecord[] = []
  displayedColumns: string[] = ['position', 'name', 'course', 'time'];
  constructor(private store: Store<fromRoot.State>) {
    store.dispatch({type: fromRecord.LOAD_WORLDRECORDS})
    store.select<any>(getAllRecords).subscribe(
      TrackRecord => console.log(TrackRecord)//this.record$ = TrackRecord
    )
    this.displayedColumns = ColumnNames(this.record$[0])
  }
  ngOnInit() {
  }
}
function ColumnNames(recordFile: TrackRecord): string[]{
  let Names: string[] = []
  for(let key in recordFile){
    Names.push(key)
  }
  return Names;
}

