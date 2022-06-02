import { RecordService } from '../app/Store/Service/record.service';
import { TestBed } from '@angular/core/testing';



describe('RecordService', () => {
  let service: RecordService;

  beforeAll(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordService);
  })
  it("Should work", () => {

  })
})

