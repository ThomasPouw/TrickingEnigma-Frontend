import { Component, OnInit } from '@angular/core';
import {Record} from "../../Store/Model/Record";
import * as fromRecord from "../../Store/Actions/records.actions";
import {getAllBestUserRecords, getAllRecords} from "../../Store/Selector/records.selector";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../Store/Reducers";
import * as fromLevel from "../../Store/Actions/level.actions";

@Component({
  selector: 'app-user-page-record',
  templateUrl: './user-page-record.component.html',
  styleUrls: ['./user-page-record.component.css']
})
export class UserPageRecordComponent implements OnInit {
  public Personal_Records: Record[] = [];
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userID") != undefined){
      this.store.dispatch({type: fromRecord.LOAD_USER_RECORDS, userID: sessionStorage.getItem("userID")});
      this.store.select<Record[]>(getAllRecords).subscribe(
        records => this.getCompleteRecords(records)
      )
      //  Record => {if(Record){this.PB = Record}}
     // )
     // this.store.select<Record>(getUserRecord).subscribe(
      //  Record => this.time = (Math.floor(Record.time / 60)) + ":" + ('0' + (Record.time % 60)).slice(-2)
     // )
    }
  }
  getCompleteRecords(records: Record[]): void{
    let levelIDs: string[] = [];
    for(let i =0; i < records.length; i++){
      if(typeof records[i].levelID !== undefined){
        levelIDs.push(records[i].levelID)
      }
      this.store.dispatch({type: fromLevel.LOAD_LEVELS_BY_IDS, levelIDs: levelIDs})
      this.store.select(getAllBestUserRecords).subscribe(records => {
        this.Personal_Records = records
      })

    }
  }
  timeConverter(time: number): string{
    return (Math.floor(time/60)) +":"+ ('0' + (time % 60)).slice(-2)
  }
  dateConverter(time: string): string{

    let date = new Date();
    date.setTime(parseInt(time));
    console.log(date)
    return date.toLocaleDateString() +"  "+ date.toLocaleTimeString()
  }
  sortOn(sortedBy: string){
    if(sortedBy == "time")
    this.Personal_Records.sort((a, b) => {
      if(a.time > b.time){return 1}
      if(a.time < b.time){return -1}
      return 0;
    })
    else if(sortedBy == "turns")
      this.Personal_Records.sort((a, b) => {
        if(a.turns > b.turns){return 1}
        if(a.turns < b.turns){return -1}
        return 0;
      })
    else if(sortedBy == "name"){
      this.Personal_Records.sort((a, b) => {
        if(a.levelName && b.levelName){
          if(a.levelName > b.levelName){return 1}
          if(a.levelName < b.levelName){return -1}
        }
        return 0;
      })
    }
    else{
      this.Personal_Records.sort((a, b) => {
        if(a.recordCreated && b.recordCreated){
          if(a.recordCreated > b.recordCreated){return 1}
          if(a.recordCreated < b.recordCreated){return -1}
        }
        return 0;
      })
    }
  }

}
