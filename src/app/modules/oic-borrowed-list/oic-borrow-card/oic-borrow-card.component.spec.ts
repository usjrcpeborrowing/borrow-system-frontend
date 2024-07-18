import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OicBorrowCardComponent } from './oic-borrow-card.component';

describe('OicBorrowCardComponent', () => {
  let component: OicBorrowCardComponent;
  let fixture: ComponentFixture<OicBorrowCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OicBorrowCardComponent]
    });
    fixture = TestBed.createComponent(OicBorrowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
