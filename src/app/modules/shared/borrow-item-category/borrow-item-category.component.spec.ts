import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowItemCategoryComponent } from './borrow-item-category.component';

describe('BorrowItemCategoryComponent', () => {
  let component: BorrowItemCategoryComponent;
  let fixture: ComponentFixture<BorrowItemCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowItemCategoryComponent]
    });
    fixture = TestBed.createComponent(BorrowItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
