import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingOfStoriesComponent } from './stories-of-following.component';

describe('FollowingOfStoriesComponent', () => {
  let component: FollowingOfStoriesComponent;
  let fixture: ComponentFixture<FollowingOfStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowingOfStoriesComponent],
    });
    fixture = TestBed.createComponent(FollowingOfStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
