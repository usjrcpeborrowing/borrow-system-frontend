import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardButtonsComponent } from './dashboard-buttons.component';

describe('DashboardButtonsComponent', () => {
  let component: DashboardButtonsComponent;
  let fixture: ComponentFixture<DashboardButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardButtonsComponent]
    });
    fixture = TestBed.createComponent(DashboardButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
