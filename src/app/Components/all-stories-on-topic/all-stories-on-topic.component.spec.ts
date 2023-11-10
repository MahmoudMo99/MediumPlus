import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesOnTopicComponent } from './all-stories-on-topic.component';

describe('AllArticlesOnTopicComponent', () => {
  let component: AllArticlesOnTopicComponent;
  let fixture: ComponentFixture<AllArticlesOnTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllArticlesOnTopicComponent],
    });
    fixture = TestBed.createComponent(AllArticlesOnTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
