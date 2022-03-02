import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TrackRecord} from "../../Store/Reducers/records.reducer";
import {Store} from "@ngrx/store";
export interface Records {
  position: number;
  course?: string;
  name: string;
  time: string;
  turns?: number;
  nationality?: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  record$: [] = []
  displayedColumns: string[] = ['position', 'name', 'course', 'time'];
  constructor(private store: Store<{ records: TrackRecord[] }>) {}
  ngOnInit() {
    this.store.dispatch({ type: '[record Component] WorldRecords' });
  }
  @Input("RecordType") dataSource: Records[] = []
}

