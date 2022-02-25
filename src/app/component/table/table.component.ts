import {Component, Input, OnInit} from '@angular/core';
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
  displayedColumns: string[] = ['position', 'name', 'course', 'time'];
  constructor() { }
  getData(recordType?: string, userID?: string, nationality?: string): Records[] {
    switch (recordType){
      case("1"):
        return [{position: 1, name: 'Hydrogen', course: "Hasta La Vista station", time: '1:56'},
          {position: 2, name: 'Hydrogen', course: "Hasta La Vista station 2", time: '2:56'}];
      case("2"):
        return [{position: 1, name: 'Hydrogen', course: "Hasta La Vista station", time: '1:56'},
          {position: 2, name: 'Hydrogen', course: "Hasta La Vista station 2", time: '2:56'},
          {position: 3, name: 'Hydrogen', course: "Hasta La Vista station 3", time: '3:56'},]
      case("3"):
        return [{position: 1, name: 'Hydrogen', course: "Hasta La Vista station", time: '1:56'},
          {position: 2, name: 'Hydrogen', course: "Hasta La Vista station 2", time: '2:56'},
          {position: 3, name: 'Hydrogen', course: "Hasta La Vista station 3", time: '3:56'},
          {position: 4, name: 'Hydrogen', course: "Hasta La Vista station 4", time: '4:56'},]
      default:
        return [{position: 1, name: 'Hydrogen', course: "Hasta La Vista station", time: '1:56'}]
    }
  }
  ngOnInit(): void {
  }
  @Input("RecordType") dataSource: Records[] = []
}
