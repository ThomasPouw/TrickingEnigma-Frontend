import {Observable} from "rxjs";
import {NationalityEffects} from "../../../app/Store/Effects/nationality.effects";
import {NationalityService} from "../../../app/Store/Service/nationality.service";
import {TestBed} from "@angular/core/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {LevelEffects} from "../../../app/Store/Effects/level.effects";
import {LevelService} from "../../../app/Store/Service/level.service";
import {Nationality} from "../../../app/Store/Model/Nationality";
import {
  Load_All_Nationality,
  Load_NationalityByID,
  Nationality_Success
} from "../../../app/Store/Actions/nationality.actions";
import {cold, hot} from "jasmine-marbles";
import {Level_Success, Load_Level, Load_Levels, Load_Levels_By_IDs} from "../../../app/Store/Actions/level.actions";
import {Level} from "../../../app/Store/Model/Level";
import {levels} from "../../Dummy_Data/level";

describe("Level Effects", () => {
  let actions: Observable<any>;
  let effects: LevelEffects;
  let levelService: jasmine.SpyObj<LevelService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LevelEffects,
        provideMockActions(() => actions),
        {
          provide: LevelService,
          useValue: {
            GetLevels: jasmine.createSpy(),
            GetLevelByID: jasmine.createSpy(),
            GetLevelsByID: jasmine.createSpy(),
          }
        },
      ],
    });

    effects = TestBed.inject(LevelEffects);
    levelService = TestBed.get(LevelService);
  });
  it('Should return all Levels when called', () =>{
    const action = Load_Levels();
    const outcome = Level_Success({level: levels})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: levels });
    levelService.GetLevels.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadLevels$).toBeObservable(expected);
  })
  it('Should return one level when called by ID', () =>{

    const action = Load_Level({id: levels[0].id});
    const outcome = Level_Success({level: levels[0]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: levels[0] });
    levelService.GetLevelByID.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadLevelByID$).toBeObservable(expected);
  })
  it('Should return levels when called by ID', () =>{
    const action = Load_Levels_By_IDs({levelIDs: [levels[0].id, levels[3].id]});
    const outcome = Level_Success({level: [levels[0], levels[3]]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: [levels[0], levels[3]] });
    levelService.GetLevelsByID.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadLevelsByID$).toBeObservable(expected);
  })
})
