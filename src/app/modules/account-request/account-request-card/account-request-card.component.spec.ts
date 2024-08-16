import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestCardComponent } from './account-request-card.component';

describe('AccountRequestCardComponent', () => {
  let component: AccountRequestCardComponent;
  let fixture: ComponentFixture<AccountRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRequestCardComponent]
    });
    fixture = TestBed.createComponent(AccountRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
