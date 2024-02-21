import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBackgroundComponent } from './landing-background.component';

describe('LandingBackgroundComponent', () => {
  let component: LandingBackgroundComponent;
  let fixture: ComponentFixture<LandingBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingBackgroundComponent]
    });
    fixture = TestBed.createComponent(LandingBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
