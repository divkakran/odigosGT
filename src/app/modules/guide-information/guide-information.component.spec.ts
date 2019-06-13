import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideInformationComponent } from './guide-information.component';

describe('GuideInformationComponent', () => {
  let component: GuideInformationComponent;
  let fixture: ComponentFixture<GuideInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
