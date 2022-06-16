import {Observable} from "rxjs";
import * as fromReducer from "../../../app/Store/Reducers";
import {TestBed} from "@angular/core/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {
  Edit_Nationality,
  Load_All_Nationality,
  Load_NationalityByID, Nationality_Success,
  Post_Nationality
} from "../../../app/Store/Actions/nationality.actions";
import {nationalities} from "../../Dummy_Data/nationality";
import {
  Add_Record, Load_All_UserRecords,
  Load_Records,
  Load_UserRecord,
  Load_WorldRecord,
  Record_Success
} from "../../../app/Store/Actions/records.actions";
import {records} from "../../Dummy_Data/record";
import {users} from "../../Dummy_Data/user";
import {levels} from "../../Dummy_Data/level";

describe("Record Actions", () => {
  let actions: Observable<any>;
  let initialState: any;
  beforeEach(() => {
    actions = new Observable<any>()
    initialState = fromReducer;
    TestBed.configureTestingModule({
      providers: [
        LevelEffects,
        provideMockActions(() => actions),
      ],
    });
  })
  it('Should have loaded the complete state', () => {
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(initialState, actions);
    const state = fromReducer.reducer(initialState, actions)
    expect(state).toBe(initialState)
  })
  it('Should give me a Record in RecordState if i post a new record', () => {
    const action = Add_Record({record: {recordCreated: 47737, levelID: "546768", time: 42, turns: 6, userID: "56475"}});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.records.record = {recordCreated: 47737, levelID: "546768", time: 42, turns: 6, userID: "56475"}
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load All Records', () => {
    const action = Load_Records()
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.records.records = records;
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load Record By levelID and User ID', () => {
    const action = Load_UserRecord({userID: users[1].id, levelID: levels[0].id});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.records.record = records[0]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load WorldRecord By levelID ', () => {
    const action = Load_All_UserRecords({ userID: users[0].id});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.records.records = [records[0],records[5]]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load WorldRecord By levelID ', () => {
    const action = Load_WorldRecord({ id: levels[0].id});
    const tempState = fromReducer.reducer(initialState, actions);
    tempState.records.records = [records[0],records[3],records[4],records[5],records[6],records[7],records[8],records[9],records[10]]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })

  describe("Succesful Records", () => {
    it('Record Array', () => {
      const action = Record_Success({record: records});
      const tempState = fromReducer.reducer(initialState, actions);
      tempState.records.records = records
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
    it('Record Single', () => {
      const action = Record_Success({record: records[0]});
      const tempState = fromReducer.reducer(initialState, actions);
      tempState.records.record = records[0]
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      console.log(tempState.records.error)
      expect(tempState).not.toBe(initialState);
    })
  })
})
