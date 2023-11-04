import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideProfileComponent } from './left-side-profile.component';

describe('LeftSideProfileComponent', () => {
  let component: LeftSideProfileComponent;
  let fixture: ComponentFixture<LeftSideProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSideProfileComponent]
    });
    fixture = TestBed.createComponent(LeftSideProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
