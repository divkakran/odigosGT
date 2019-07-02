import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyBookingComponent } from './easy-booking.component';

describe('EasyBookingComponent', () => {
  let component: EasyBookingComponent;
  let fixture: ComponentFixture<EasyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
