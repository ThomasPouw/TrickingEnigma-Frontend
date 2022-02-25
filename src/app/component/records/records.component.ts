import { Component, OnInit } from '@angular/core';
import {Records} from "../table/table.component";
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  Showrecord: boolean;
  constructor() {
    this.Showrecord = true
  }
  getData(recordType?: string, userID?: string, nationality?: string): Records[] {
    console.log(recordType);
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
}
