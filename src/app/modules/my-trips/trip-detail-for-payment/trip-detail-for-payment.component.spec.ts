import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailForPaymentComponent } from './trip-detail-for-payment.component';

describe('TripDetailForPaymentComponent', () => {
  let component: TripDetailForPaymentComponent;
  let fixture: ComponentFixture<TripDetailForPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDetailForPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailForPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
