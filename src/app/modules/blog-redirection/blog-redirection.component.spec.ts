import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRedirectionComponent } from './blog-redirection.component';

describe('BlogRedirectionComponent', () => {
  let component: BlogRedirectionComponent;
  let fixture: ComponentFixture<BlogRedirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogRedirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
