import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFacultyComponent } from './history-faculty.component';

describe('HistoryFacultyComponent', () => {
  let component: HistoryFacultyComponent;
  let fixture: ComponentFixture<HistoryFacultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryFacultyComponent]
    });
    fixture = TestBed.createComponent(HistoryFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
