import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAGuideComponent } from './become-aguide.component';

describe('BecomeAGuideComponent', () => {
  let component: BecomeAGuideComponent;
  let fixture: ComponentFixture<BecomeAGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
