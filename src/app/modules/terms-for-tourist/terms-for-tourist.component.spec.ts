import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsForTouristComponent } from './terms-for-tourist.component';

describe('TermsForTouristComponent', () => {
  let component: TermsForTouristComponent;
  let fixture: ComponentFixture<TermsForTouristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsForTouristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsForTouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
