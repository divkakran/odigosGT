import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSearchListComponent } from './trip-search-list.component';

describe('TripSearchListComponent', () => {
  let component: TripSearchListComponent;
  let fixture: ComponentFixture<TripSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
