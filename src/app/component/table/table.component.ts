import {AfterViewInit, Component, Directive, Input, OnInit, ViewChild} from '@angular/core';
import * as fromRoot from "../../Store/Reducers"
import {Store} from "@ngrx/store";
import {getAllBestRecords, getAllRecords, getLevelRecords, getUserIDs} from "../../Store/Selector/records.selector";
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
  objective: string
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
  public mode: tableSort = {turns: true, objective: ""}
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.params
      .subscribe(params => {
        //this.store.dispatch({type: LevelActions.LOAD_LEVEL, id: params["id"]});
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
  position(number: number): number{
    return number;
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
          this.store.select<Record[]>(getAllBestRecords(false, true, nationality)).subscribe(
            record => {
              if(this.mode.turns){
                this.displayedColumns = ["position", "turns", "time", "userName", "nationality"]
                record.sort((a, b) => {
                  if(a.turns > b.turns){return 1}
                  if(a.turns < b.turns){return -1}
                  return 0;
                })
              }
              else{
                this.displayedColumns = ["position", "time", "turns", "userName", "nationality"]
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

