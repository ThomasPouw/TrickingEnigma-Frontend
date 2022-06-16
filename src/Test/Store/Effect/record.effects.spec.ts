import {Observable} from "rxjs";
import {NationalityEffects} from "../../../app/Store/Effects/nationality.effects";
import {NationalityService} from "../../../app/Store/Service/nationality.service";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {RecordService} from "../../../app/Store/Service/record.service";
import {RecordEffects} from "../../../app/Store/Effects/records.effects";
import {Level_Success, Load_Level, Load_Levels, Load_Levels_By_IDs} from "../../../app/Store/Actions/level.actions";
import {levels} from "../../Dummy_Data/level";
import {cold, hot} from "jasmine-marbles";
import {
  Add_Record,
  Load_All_UserRecords,
  Load_UserRecord,
  Load_WorldRecord,
  Record_Success
} from "../../../app/Store/Actions/records.actions";
import {records} from "../../Dummy_Data/record";
import * as fromReducer from "../../../app/Store/Reducers";
import {nationalities} from "../../Dummy_Data/nationality";
import {users} from "../../Dummy_Data/user";

describe("Record Effects", () => {
  let actions: Observable<any>;
  let effects: RecordEffects;
  let recordService: jasmine.SpyObj<RecordService>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      providers: [
        RecordEffects,
        provideMockActions(() => actions),
        {
          provide: RecordService,
          useValue: {
            GetAllRecords: jasmine.createSpy(),
            GetRecordsByLevel: jasmine.createSpy(),
            GetUserRecords: jasmine.createSpy(),
            GetUserRecord: jasmine.createSpy(),
            GetRecordsByNationality: jasmine.createSpy(),
            PostRecord: jasmine.createSpy(),
          }
        },
      ],
    });

    effects = TestBed.inject(RecordEffects);
    recordService = TestBed.get(RecordService);
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user = users[0];
    initialState.levels.levels = levels;
    initialState.levels.level = levels[0];
  });
  it('Should return all WorldRecords when called', () =>{
    const action = Load_WorldRecord({id: records[0].levelID});
    const outcome = Record_Success({record: [records[0], records[3],records[4],records[5],records[6],records[7],records[8],records[9],records[10]]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: [records[0], records[3],records[4],records[5],records[6],records[7],records[8],records[9],records[10]]});
    recordService.GetRecordsByLevel.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadWorldRecords$).toBeObservable(expected);
  })
  it('Should return record when called by UserID and LevelID', () =>{

    const action = Load_UserRecord({userID: records[0].userID, levelID: records[0].levelID});
    const outcome = Record_Success({record: records[0]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: records[0] });
    recordService.GetUserRecord.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadUserRecord$).toBeObservable(expected);
  })
  it('Should return records when called by userID', () =>{
    const action = Load_All_UserRecords({userID: records[0].userID});
    const outcome = Record_Success({record: [records[0], records[5]]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: [records[0], records[5]] });
    recordService.GetUserRecords.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadUserRecords$).toBeObservable(expected);
  })
  it('Should Add Record', () =>{
    const action = Add_Record({record: {
        time: 254,
        turns: 8,
        recordCreated: 1648132524807,
        userID: "798b0155-c913-4145-956f-369dcdcd1c30",
        levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe"
      }});
    const outcome = Record_Success({record: {
        time: 254,
        turns: 8,
        recordCreated: 1648132524807,
        userID: "798b0155-c913-4145-956f-369dcdcd1c30",
        levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe"
      }})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: {
        time: 254,
        turns: 8,
        recordCreated: 1648132524807,
        userID: "798b0155-c913-4145-956f-369dcdcd1c30",
        levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe"
      } });
    recordService.PostRecord.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.postRecord$).toBeObservable(expected);
  })
})
