import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromTopicComponent } from './form-topic.component';

describe('FromTopicComponent', () => {
  let component: FromTopicComponent;
  let fixture: ComponentFixture<FromTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FromTopicComponent],
    });
    fixture = TestBed.createComponent(FromTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
