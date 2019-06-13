import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllTripsComponent } from './see-all-trips.component';

describe('SeeAllTripsComponent', () => {
  let component: SeeAllTripsComponent;
  let fixture: ComponentFixture<SeeAllTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
