import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReadsComponent } from './header-reads.component';

describe('HeaderReadsComponent', () => {
  let component: HeaderReadsComponent;
  let fixture: ComponentFixture<HeaderReadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderReadsComponent]
    });
    fixture = TestBed.createComponent(HeaderReadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
