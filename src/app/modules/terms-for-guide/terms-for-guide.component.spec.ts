import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsForGuideComponent } from './terms-for-guide.component';

describe('TermsForGuideComponent', () => {
  let component: TermsForGuideComponent;
  let fixture: ComponentFixture<TermsForGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsForGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsForGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
