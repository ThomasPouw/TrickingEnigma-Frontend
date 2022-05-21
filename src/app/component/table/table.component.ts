import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import {Store} from "@ngrx/store";
import {getAllRecords, getLevelRecords} from "../../Store/Selector/records.selector";
import {Record} from "../../Store/Model/Record";
import {ActivatedRoute} from "@angular/router";
import * as LevelActions from "../../Store/Actions/level.actions";
import * as RecordActions from "../../Store/Actions/records.actions";
import * as UserActions from "../../Store/Actions/user.actions";
import {getLevel} from "../../Store/Selector/level.selector";
import {Level} from "../../Store/Model/Level";
import {getUsers} from "../../Store/Reducers/user.reducer";
import {User} from "../../Store/Model/User";
import {getAllUsers} from "../../Store/Selector/user.selector";
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  public record$: Record[] = [];
  public displayedColumns: string[] = [];
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.store.dispatch({type: LevelActions.LOAD_LEVEL, id: params["id"]});
        this.store.dispatch({type: RecordActions.LOAD_WORLDRECORDS, id: params["id"]})
        this.store.select<Record[]>(getLevelRecords).subscribe(
          Record => this.ColumnNames(Record)
        )
      })
  }
  timeConvert(time: number | string){
    if(typeof time == "string"){
      return time;
    }
    return (Math.floor(time/60)) +":"+ ('0' + (time % 60)).slice(-2)
  }
  ColumnNames(recordFile: Record[]): void{
    let Names: string[] = []
    this.record$  = JSON.parse(JSON.stringify(recordFile));
    console.log(this.record$)
    var _userIDs: string[] = [];
    this.store.select<Level>(getLevel).subscribe(
      level => {
        for(var i =0; i < recordFile.length; i++){
          this.record$[i].courseName = level.name;
          if(this.record$[i].userID !== undefined){
            _userIDs.push(this.record$[i].userID)
          }
        }
        if(_userIDs.length != 0){
          this.store.dispatch({type: UserActions.LOAD_USERS, UserIDs: _userIDs})
          this.store.select<User[]>(getAllUsers).subscribe(
            users => {
              for (var i = 0; i < recordFile.length; i++) {
                this.record$[i].userName = users[i].name;
              }
              console.log(this.record$)
              Names.length = 0;
              for(let key in this.record$[0]){
                if(key !== "recordCreated" && key !== "userID" && key !== "levelID"&& key !== "id")
                  Names.push(key)
              }
              console.log(Names)
              this.displayedColumns = Names.sort();
            }
          )
        }
      }
    )
  }
}

