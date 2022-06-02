import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageRecordComponent } from './user-page-record.component';

describe('UserPageRecordComponent', () => {
  let component: UserPageRecordComponent;
  let fixture: ComponentFixture<UserPageRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPageRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
