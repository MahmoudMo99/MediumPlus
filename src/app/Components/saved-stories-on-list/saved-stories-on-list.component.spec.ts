import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedArticlesOnListComponent } from './saved-stories-on-list.component';

describe('SavedArticlesOnListComponent', () => {
  let component: SavedArticlesOnListComponent;
  let fixture: ComponentFixture<SavedArticlesOnListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedArticlesOnListComponent],
    });
    fixture = TestBed.createComponent(SavedArticlesOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
