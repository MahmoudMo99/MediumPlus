import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditoComponent } from './ImageEditoComponent';

describe('ImageEditoComponent', () => {
  let component: ImageEditoComponent;
  let fixture: ComponentFixture<ImageEditoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditoComponent],
    });
    fixture = TestBed.createComponent(ImageEditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
