import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetOurGuideComponent } from './meet-our-guide.component';

describe('MeetOurGuideComponent', () => {
  let component: MeetOurGuideComponent;
  let fixture: ComponentFixture<MeetOurGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetOurGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetOurGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
