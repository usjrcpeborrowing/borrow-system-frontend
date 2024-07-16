import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBorrowCategoryComponent } from './student-borrow-category.component';

describe('StudentBorrowCategoryComponent', () => {
  let component: StudentBorrowCategoryComponent;
  let fixture: ComponentFixture<StudentBorrowCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBorrowCategoryComponent]
    });
    fixture = TestBed.createComponent(StudentBorrowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
