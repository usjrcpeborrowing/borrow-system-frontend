import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPanelComponent } from './landing-panel.component';

describe('LandingPanelComponent', () => {
  let component: LandingPanelComponent;
  let fixture: ComponentFixture<LandingPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPanelComponent]
    });
    fixture = TestBed.createComponent(LandingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
