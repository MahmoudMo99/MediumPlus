import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfStoriesComponent } from './all-of-stories.component';

describe('AllOfStoriesComponent', () => {
  let component: AllOfStoriesComponent;
  let fixture: ComponentFixture<AllOfStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllOfStoriesComponent]
    });
    fixture = TestBed.createComponent(AllOfStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
