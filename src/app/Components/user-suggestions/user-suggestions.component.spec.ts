import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSuggestionsComponent } from './user-suggestions.component';

describe('UserSuggestionsComponent', () => {
  let component: UserSuggestionsComponent;
  let fixture: ComponentFixture<UserSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSuggestionsComponent]
    });
    fixture = TestBed.createComponent(UserSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
