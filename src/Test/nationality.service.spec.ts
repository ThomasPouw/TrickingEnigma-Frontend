import {TestBed} from "@angular/core/testing";
import {NationalityService} from "../app/Store/Service/nationality.service";

describe('NationalityService', () => {
  let service: NationalityService;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalityService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})
