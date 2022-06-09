import {NationalityEffects} from "../../../app/Store/Effects/nationality.effects";
import {Observable} from "rxjs";
import {NationalityService} from "../../../app/Store/Service/nationality.service";
import {provideMockActions} from "@ngrx/effects/testing";
import {TestBed} from "@angular/core/testing";
import {Nationality} from "../../../app/Store/Model/Nationality";
import {
  Load_All_Nationality,
  Load_NationalityByID,
  Nationality_Success
} from "../../../app/Store/Actions/nationality.actions";
import {cold, hot} from "jasmine-marbles";
import {nationalities} from "../../Dummy_Data/nationality";

describe("Nationality Effects", () => {
  let actions: Observable<any>;
  let effects: NationalityEffects;
  let nationalityService: jasmine.SpyObj<NationalityService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NationalityEffects,
        provideMockActions(() => actions),
        {
          provide: NationalityService,
          useValue: {
            GetNationalities: jasmine.createSpy(),
            GetNationalityByID: jasmine.createSpy()
          }
        },
      ],
    });

    effects = TestBed.inject(NationalityEffects);
    nationalityService = TestBed.get(NationalityService);
  });
  it('Should return all nationalities when called', () =>{;
    const action = Load_All_Nationality();
    const outcome = Nationality_Success({nationality: nationalities})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: nationalities });
    nationalityService.GetNationalities.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadAllNationalities$).toBeObservable(expected);
  })
  it('Should return one nationality when called by ID', () =>{
    const action = Load_NationalityByID({nationalityID: nationalities[0].id});
    const outcome = Nationality_Success({nationality: nationalities[0]})

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: nationalities[0] });
    nationalityService.GetNationalityByID.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.loadNationalityByID$).toBeObservable(expected);
  })
})
