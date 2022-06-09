import {Observable} from "rxjs";
import {RecordEffects} from "../../../app/Store/Effects/records.effects";
import {RecordService} from "../../../app/Store/Service/record.service";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {getAllRecords, getUserRecord} from "../../../app/Store/Selector/records.selector";
import {records} from "../../Dummy_Data/record";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../../../app/Store/Reducers";
import {Load_All_UserRecords, Record_Success} from "../../../app/Store/Actions/records.actions";
import {getRecord} from "../../../app/Store/Reducers/records.reducer";
import {provideMockStore} from "@ngrx/store/testing";
import {cold, hot} from "jasmine-marbles";

describe("Record Selector", () => {
  let actions: Observable<any>;
  let effects: RecordEffects;
  let recordService: jasmine.SpyObj<RecordService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({reducer}),
      ],
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
    }).compileComponents();
    effects = TestBed.inject(RecordEffects);
    recordService = TestBed.get(RecordService);
  });
  it("Should return a call of records", () => {
    const action = Load_All_UserRecords({userID: records[0].userID});
    const outcome = Record_Success({record: [records[0], records[5]]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: [records[0], records[5]] });
    recordService.GetUserRecords.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    const result = getAllRecords.projector(records);
    expect(result).toEqual(records); // no work?
  })
  it("Should return a call of record", () => {
    const result = getUserRecord.projector(records[0]);
    expect(result).toEqual(records[0]);
    expect(result).not.toEqual(records[1])
  })
})
