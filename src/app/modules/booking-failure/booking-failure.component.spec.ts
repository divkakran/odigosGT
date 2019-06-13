import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFailureComponent } from './booking-failure.component';

describe('BookingFailureComponent', () => {
  let component: BookingFailureComponent;
  let fixture: ComponentFixture<BookingFailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
