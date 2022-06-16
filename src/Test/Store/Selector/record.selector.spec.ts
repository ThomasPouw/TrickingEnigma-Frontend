import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {nationalities} from "../../Dummy_Data/nationality";
import {records} from "../../Dummy_Data/record";
import {getAllNationalities} from "../../../app/Store/Selector/nationality.selector";
import {getRecords} from "../../../app/Store/Reducers/records.reducer";
import {
  getAllBestRecords,
  getAllBestUserRecords,
  getAllRecords,
  getUserRecord
} from "../../../app/Store/Selector/records.selector";
import {users} from "../../Dummy_Data/user";

describe("Nationality Selector", () => {
  let actions: Observable<any>;
  let initialState: any;
  let bestUserRecord = [
    {
      time: 253,
      turns: 7,
      recordCreated: 1648132524806,
      userID: "798b0155-c913-4145-956f-369dcdcd1c30",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "584e9d6c-d5f4-4f8c-8362-ad0ace813d4b"
    },
    {
      time: 5,
      turns: 1,
      recordCreated: 1651582694402,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "7b2fade1-af0e-4696-b593-9d79fd0f6336",
      levelName: "Right Round Station",
      id: "46f9600d-f4e5-4db1-9383-7b5ae1533236"
    },
    {
      time: 10,
      turns: 8,
      recordCreated: 1654078360193,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "f9f7df9c-4a22-4f33-bb27-90d984a21015",
      levelName: "Notorious Station",
      id: "7ac231a2-82a6-4c7a-8b12-d166d05ba93e"
    },
    {
      time: 32667,
      turns: 46,
      recordCreated: 1654078471429,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "43693bb9-dfad-4528-a303-11fbac836bfb"
    },
    {
      time: 5,
      turns: 464,
      recordCreated: 1648128324806,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "584e9d6c-d5f4-4f8c-8362-ad0ace813d4a"
    },
    {
      time: 353,
      turns: 25,
      recordCreated: 1654078360193,
      userID: "798b0155-c913-4145-956f-369dcdcd1c30",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "7ac231a2-82a6-4c7a-81b2-d166d05ba93e"
    },
    {
      time: 37,
      turns: 1,
      recordCreated: 1654155263380,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "cc4dbf3b-928f-438e-b56c-a94f56352c05"
    },
    {
      time: 2,
      turns: 6,
      recordCreated: 1654155334027,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "b2dd83ac-f348-48d5-a663-b3fe585653a1"
    },
    {
      time: 2,
      turns: 3,
      recordCreated: 1654155378003,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "bcf9c8fd-f04b-4521-91e5-6870cd4a7951"
    },
    {
      time: 4,
      turns: 9,
      recordCreated: 1654169656766,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "cbce246a-96a2-4444-a537-a5d95d043d41"
    },
    {
      time: 7,
      turns: 21,
      recordCreated: 1654177063980,
      userID: "33fe0ee2-3b94-4e9d-82ab-434d08650967",
      levelID: "9948f878-9970-4cdf-ab76-4c0f95faaebe",
      levelName: "Hasta La Vista Station",
      id: "6fb3ac16-392a-49a4-933d-0941ad85a5c8"
    }
  ]

  beforeEach(() => {
    actions = new Observable<any>()
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(fromReducer, actions);
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions),
      ],
    });
    initialState.nationalities.nationalities = nationalities;
    initialState.nationalities.nationality = nationalities[0];
    initialState.records.records = records;
    initialState.records.record = records[0];
    initialState.users.users = users;
    initialState.users.user= users[0];
  })
  it("should give all records", () => {
    expect(getAllRecords.projector(initialState)).toBe(records);
  })
  it("should give record by ID", () => {
    expect(getUserRecord.projector(initialState)).toBe(records[0]);
  })
  it("should give all user Records", () => {
    console.log(getAllBestUserRecords.projector(initialState))
    expect(getAllBestUserRecords.projector(initialState)).toEqual(bestUserRecord);
  })
  it("should give all Best Records", () => {
    console.log(getAllBestRecords(true, false, nationalities[0].id).projector(initialState))
    expect(getAllBestRecords(true, false, nationalities[0].id).projector(initialState)).toEqual(bestUserRecord);
  })
})
