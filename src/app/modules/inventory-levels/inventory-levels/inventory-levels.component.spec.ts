import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLevelsComponent } from './inventory-levels.component';

describe('InventoryLevelsComponent', () => {
  let component: InventoryLevelsComponent;
  let fixture: ComponentFixture<InventoryLevelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryLevelsComponent]
    });
    fixture = TestBed.createComponent(InventoryLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
