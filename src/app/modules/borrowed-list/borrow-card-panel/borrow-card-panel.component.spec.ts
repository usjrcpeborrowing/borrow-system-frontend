import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowCardPanelComponent } from './borrow-card-panel.component';

describe('BorrowCardPanelComponent', () => {
  let component: BorrowCardPanelComponent;
  let fixture: ComponentFixture<BorrowCardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowCardPanelComponent]
    });
    fixture = TestBed.createComponent(BorrowCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
