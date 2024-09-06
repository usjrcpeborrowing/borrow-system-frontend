import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEquipmentRequestCardComponent } from './inventory-equipment-request-card.component';

describe('InventoryEquipmentRequestCardComponent', () => {
  let component: InventoryEquipmentRequestCardComponent;
  let fixture: ComponentFixture<InventoryEquipmentRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryEquipmentRequestCardComponent]
    });
    fixture = TestBed.createComponent(InventoryEquipmentRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
