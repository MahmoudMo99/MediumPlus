import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArticlesComponent } from './table-stories.component';

describe('TableArticlesComponent', () => {
  let component: TableArticlesComponent;
  let fixture: ComponentFixture<TableArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableArticlesComponent],
    });
    fixture = TestBed.createComponent(TableArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
