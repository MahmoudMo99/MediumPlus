import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteStoryComponent } from './WriteStoryComponent';

describe('WriteStoryComponent', () => {
  let component: WriteStoryComponent;
  let fixture: ComponentFixture<WriteStoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteStoryComponent]
    });
    fixture = TestBed.createComponent(WriteStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
