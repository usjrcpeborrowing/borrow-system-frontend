import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OicBorrowedListComponent } from './oic-borrowed-list.component';

describe('OicBorrowedListComponent', () => {
  let component: OicBorrowedListComponent;
  let fixture: ComponentFixture<OicBorrowedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OicBorrowedListComponent]
    });
    fixture = TestBed.createComponent(OicBorrowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
