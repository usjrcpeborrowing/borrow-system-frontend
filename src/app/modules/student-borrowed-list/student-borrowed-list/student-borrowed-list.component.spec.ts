import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBorrowedListComponent } from './student-borrowed-list.component';

describe('StudentBorrowedListComponent', () => {
  let component: StudentBorrowedListComponent;
  let fixture: ComponentFixture<StudentBorrowedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBorrowedListComponent]
    });
    fixture = TestBed.createComponent(StudentBorrowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
