import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OicBorrowCategoryComponent } from './oic-borrow-category.component';

describe('OicBorrowCategoryComponent', () => {
  let component: OicBorrowCategoryComponent;
  let fixture: ComponentFixture<OicBorrowCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OicBorrowCategoryComponent]
    });
    fixture = TestBed.createComponent(OicBorrowCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
