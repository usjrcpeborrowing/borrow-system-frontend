import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentContentsComponent } from './student-contents.component';

describe('StudentContentsComponent', () => {
  let component: StudentContentsComponent;
  let fixture: ComponentFixture<StudentContentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentContentsComponent]
    });
    fixture = TestBed.createComponent(StudentContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
