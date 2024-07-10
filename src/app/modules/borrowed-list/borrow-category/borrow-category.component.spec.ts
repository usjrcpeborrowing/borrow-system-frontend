import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCategoryComponent } from './borrow-category.component';

describe('BorrowCategoryComponent', () => {
  let component: BorrowCategoryComponent;
  let fixture: ComponentFixture<BorrowCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowCategoryComponent]
    });
    fixture = TestBed.createComponent(BorrowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
