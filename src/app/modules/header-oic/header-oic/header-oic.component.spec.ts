import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOicComponent } from './header-oic.component';

describe('HeaderOicComponent', () => {
  let component: HeaderOicComponent;
  let fixture: ComponentFixture<HeaderOicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderOicComponent]
    });
    fixture = TestBed.createComponent(HeaderOicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
