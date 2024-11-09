import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowHistoryDialogComponent } from './borrow-history-dialog.component';

describe('BorrowHistoryDialogComponent', () => {
  let component: BorrowHistoryDialogComponent;
  let fixture: ComponentFixture<BorrowHistoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowHistoryDialogComponent]
    });
    fixture = TestBed.createComponent(BorrowHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
