import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingDestinationComponent } from './trending-destination.component';

describe('TrendingDestinationComponent', () => {
  let component: TrendingDestinationComponent;
  let fixture: ComponentFixture<TrendingDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
