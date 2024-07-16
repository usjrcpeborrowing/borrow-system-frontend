import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBorrowCardPanelComponent } from './student-borrow-card-panel.component';

describe('StudentBorrowCardPanelComponent', () => {
  let component: StudentBorrowCardPanelComponent;
  let fixture: ComponentFixture<StudentBorrowCardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBorrowCardPanelComponent]
    });
    fixture = TestBed.createComponent(StudentBorrowCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
