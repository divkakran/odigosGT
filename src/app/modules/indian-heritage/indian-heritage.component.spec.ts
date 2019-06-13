import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianHeritageComponent } from './indian-heritage.component';

describe('IndianHeritageComponent', () => {
  let component: IndianHeritageComponent;
  let fixture: ComponentFixture<IndianHeritageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndianHeritageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndianHeritageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
