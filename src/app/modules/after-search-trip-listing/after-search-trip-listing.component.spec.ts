import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSearchTripListingComponent } from './after-search-trip-listing.component';

describe('AfterSearchTripListingComponent', () => {
  let component: AfterSearchTripListingComponent;
  let fixture: ComponentFixture<AfterSearchTripListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSearchTripListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSearchTripListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
