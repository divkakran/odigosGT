import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTripsComponent } from './category-trips.component';

describe('CategoryTripsComponent', () => {
  let component: CategoryTripsComponent;
  let fixture: ComponentFixture<CategoryTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
