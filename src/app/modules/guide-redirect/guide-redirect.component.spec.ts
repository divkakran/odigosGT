import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideRedirectComponent } from './guide-redirect.component';

describe('GuideRedirectComponent', () => {
  let component: GuideRedirectComponent;
  let fixture: ComponentFixture<GuideRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
