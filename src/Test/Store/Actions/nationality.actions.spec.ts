import {Observable} from "rxjs";
import * as fromReducer from '../../../app/Store/Reducers';
import {NationalityEffects} from "../../../app/Store/Effects/nationality.effects";
import {NationalityService} from "../../../app/Store/Service/nationality.service";
import {TestBed} from "@angular/core/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {LevelService} from "../../../app/Store/Service/level.service";
import {
  Edit_Nationality,
  Load_All_Nationality,
  Load_NationalityByID, Nationality_Success,
  Post_Nationality
} from "../../../app/Store/Actions/nationality.actions";
import {nationalities} from "../../Dummy_Data/nationality";

describe("Nationality Actions", () => {
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
  it('Should have loaded the complete state', () =>{
    actions.subscribe(test => test = {type: "Test"})
    initialState = fromReducer.reducer(initialState, actions);
    const state = fromReducer.reducer(initialState, actions)
    expect(state).toBe(initialState)
  })
  it('Should give me a Nationality in Nationality if i post a new nationality', () =>{
    const action = Post_Nationality({ nationality: {name: "France"}});
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.nationalities.nationality = {name: "France"}
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should give me a different Nationality in Nationality if i Edit a new nationality', () =>{
    const action = Edit_Nationality({ nationality: {id: "35645785", name: "Does not exist"}});
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.nationalities.nationality = {id: "35645785",name: "Does not exist"}
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load All Nationalities', () =>{
    const action = Load_All_Nationality()
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.nationalities.nationalities = nationalities
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  it('Should Load Nationality By ID', () =>{
    const action = Load_NationalityByID({nationalityID: nationalities[0].id});
    const tempState= fromReducer.reducer(initialState, actions);
    tempState.nationalities.nationality = nationalities[0]
    initialState = fromReducer.reducer(initialState, action);
    expect(tempState).toEqual(initialState);
    expect(tempState).not.toBe(initialState);
  })
  describe("Succesful Nationality", () =>{
    it('Nationality Array', () =>{
      const action = Nationality_Success({nationality: nationalities});
      const tempState= fromReducer.reducer(initialState, actions);
      tempState.nationalities.nationalities = nationalities
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
    it('Nationality Single', () =>{
      const action = Nationality_Success({nationality: nationalities[0]});
      const tempState= fromReducer.reducer(initialState, actions);
      tempState.nationalities.nationality = nationalities[0]
      initialState = fromReducer.reducer(initialState, action);
      expect(tempState).toEqual(initialState);
      expect(tempState).not.toBe(initialState);
    })
  })
  //{
  //     "records": {
  //         "records": [],
  //         "record": {
  //             "recordCreated": 0,
  //             "time": 0,
  //             "turns": 42,
  //             "userID": "",
  //             "levelID": ""
  //         },
  //         "error": ""
  //     },
  //     "levels": {
  //         "levels": [],
  //         "level": {
  //             "id": "",
  //             "name": "",
  //             "levelSprite": [],
  //             "x_length": 0,
  //             "y_length": 0
  //         },
  //         "error": ""
  //     },
  //     "users": {
  //         "users": [],
  //         "user": {
  //             "name": "",
  //             "nationality": {
  //                 "id": "",
  //                 "name": ""
  //             }
  //         },
  //         "error": ""
  //     },
  //     "nationalities": {
  //         "nationalities": [],
  //         "nationality": {
  //             "id": "",
  //             "name": ""
  //         },
  //         "error": "",
  //         "id": ""
  //     }
  // }
})
