import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OicBorrowCardPanelComponent } from './oic-borrow-card-panel.component';

describe('OicBorrowCardPanelComponent', () => {
  let component: OicBorrowCardPanelComponent;
  let fixture: ComponentFixture<OicBorrowCardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OicBorrowCardPanelComponent]
    });
    fixture = TestBed.createComponent(OicBorrowCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
