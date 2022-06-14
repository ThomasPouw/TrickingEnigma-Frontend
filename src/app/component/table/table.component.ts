import {AfterViewInit, Component, Directive, Input, OnInit, ViewChild} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import {Store} from "@ngrx/store";
import {getAllBestRecords, getAllRecords, getUserIDs} from "../../Store/Selector/records.selector";
import {Record} from "../../Store/Model/Record";
import {ActivatedRoute} from "@angular/router";
import * as LevelActions from "../../Store/Actions/level.actions";
import * as RecordActions from "../../Store/Actions/records.actions";
import * as UserActions from "../../Store/Actions/user.actions";
import {getLevel} from "../../Store/Selector/level.selector";
import {Level} from "../../Store/Model/Level";
import {getUsers} from "../../Store/Reducers/user.reducer";
import {User} from "../../Store/Model/User";
import {getAllUsers, getUser} from "../../Store/Selector/user.selector";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Nationality} from "../../Store/Model/Nationality";
interface tableSort{
  turns: boolean,
  objective: string,
  admin: boolean
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit{
  public displayedColumns: string[] = [];
  count: number = 0;
  dataSource: any;
  @Input('mode')
  public mode: tableSort = {turns: true, objective: "", admin: false}
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }
  ngOnInit() {
    if(this.mode.admin){
      this.store.dispatch({type: RecordActions.LOAD_RECORDS})
      this.store.select<Record[]>(getAllRecords).subscribe(
        Record => this.ColumnNames(Record)
      )
    }
    else{
      this.route.params
        .subscribe(params => {
          this.store.dispatch({type: RecordActions.LOAD_WORLDRECORDS, id: params["id"]})
          this.store.select<Record[]>(getAllRecords).subscribe(
            Record => this.ColumnNames(Record)
          )
        })
    }
  }
  dateConverter(time: number): string{
    let date = new Date();
    date.setTime(time);
    return date.toLocaleDateString() +"  "+ date.toLocaleTimeString()
  }
  timeConvert(time: number | string){
    if(typeof time == "string"){
      return time;
    }
    return (Math.floor(time/60)) +":"+ ('0' + (time % 60)).slice(-2)
  }
  ColumnNames(recordFile: Record[]): void{
    let nationality: string = "";
    if(this.mode.objective == "nationality"){
      this.store.dispatch({type: UserActions.LOAD_USER, userID: sessionStorage.getItem("userID")})
      this.store.select<User>(getUser).subscribe(
        user => {nationality = user.nationality.name}
      )
    }

    this.store.select<string[]>(getUserIDs).subscribe(
      UserIDs => {
        if(UserIDs.length !== 0){
          this.store.dispatch({type: UserActions.LOAD_USERS, userIDs: UserIDs})
          this.store.select<Record[]>(getAllBestRecords(this.mode.admin, true, nationality)).subscribe(
            record => {
              if(this.mode.turns){
                this.displayedColumns = ["position", "turns", "time", "userName", "nationality"]
                record.sort((a, b) => {
                  if(a.turns > b.turns){return 1}
                  if(a.turns < b.turns){return -1}
                  return 0;
                })
              }
              else if(this.mode.admin){
                this.displayedColumns = ["levelName" ,"time", "turns", "userName", "nationality", "recordCreated"]
                record.sort((a, b) => {
                  if(a.recordCreated < b.recordCreated){return 1}
                  if(a.recordCreated > b.recordCreated){return -1}
                  return 0;
                })
              }
              else{
                this.displayedColumns = ["position" ,"time", "turns", "userName", "nationality"]
                record.sort((a, b) => {
                  if(a.time > b.time){return 1}
                  if(a.time < b.time){return -1}
                  return 0;
                })
              }
              this.dataSource =new MatTableDataSource(record);
            }
          )
        }
      }
    )
  }
}

