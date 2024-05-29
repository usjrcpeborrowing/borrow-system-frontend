import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOicComponent } from './history-oic.component';

describe('HistoryOicComponent', () => {
  let component: HistoryOicComponent;
  let fixture: ComponentFixture<HistoryOicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOicComponent]
    });
    fixture = TestBed.createComponent(HistoryOicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
