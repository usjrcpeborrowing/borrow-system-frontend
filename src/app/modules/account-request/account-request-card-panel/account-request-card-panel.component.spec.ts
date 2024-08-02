import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestCardPanelComponent } from './account-request-card-panel.component';

describe('AccountRequestCardPanelComponent', () => {
  let component: AccountRequestCardPanelComponent;
  let fixture: ComponentFixture<AccountRequestCardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRequestCardPanelComponent]
    });
    fixture = TestBed.createComponent(AccountRequestCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
