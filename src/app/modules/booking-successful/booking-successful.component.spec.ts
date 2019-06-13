import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSuccessfulComponent } from './booking-successful.component';

describe('BookingSuccessfulComponent', () => {
  let component: BookingSuccessfulComponent;
  let fixture: ComponentFixture<BookingSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
