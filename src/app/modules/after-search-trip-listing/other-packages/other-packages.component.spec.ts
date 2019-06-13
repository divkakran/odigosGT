import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPackagesComponent } from './other-packages.component';

describe('OtherPackagesComponent', () => {
  let component: OtherPackagesComponent;
  let fixture: ComponentFixture<OtherPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
