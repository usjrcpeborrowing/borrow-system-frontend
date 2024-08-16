import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBorrowCardComponent } from './student-borrow-card.component';

describe('StudentBorrowCardComponent', () => {
  let component: StudentBorrowCardComponent;
  let fixture: ComponentFixture<StudentBorrowCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBorrowCardComponent]
    });
    fixture = TestBed.createComponent(StudentBorrowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
