import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardButtonsMobileComponent } from './dashboard-buttons-mobile.component';

describe('DashboardButtonsMobileComponent', () => {
  let component: DashboardButtonsMobileComponent;
  let fixture: ComponentFixture<DashboardButtonsMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardButtonsMobileComponent]
    });
    fixture = TestBed.createComponent(DashboardButtonsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
