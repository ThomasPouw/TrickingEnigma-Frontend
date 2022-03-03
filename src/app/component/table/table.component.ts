import {Component, Input, OnInit} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import {Store} from "@ngrx/store";
import {TrackRecord} from "../../Store/Reducers/records.reducer";
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
    this.store.select<TrackRecord[]>(getAllRecords).subscribe(
      TrackRecords => this.record$ = TrackRecords
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

