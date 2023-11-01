import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsGroupComponent } from './components-group.component';

describe('ComponentsGroupComponent', () => {
  let component: ComponentsGroupComponent;
  let fixture: ComponentFixture<ComponentsGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentsGroupComponent]
    });
    fixture = TestBed.createComponent(ComponentsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
