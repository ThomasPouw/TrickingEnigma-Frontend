import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
  }
}
