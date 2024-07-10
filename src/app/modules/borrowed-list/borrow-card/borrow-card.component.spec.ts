import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCardComponent } from './borrow-card.component';

describe('BorrowCardComponent', () => {
  let component: BorrowCardComponent;
  let fixture: ComponentFixture<BorrowCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowCardComponent]
    });
    fixture = TestBed.createComponent(BorrowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
