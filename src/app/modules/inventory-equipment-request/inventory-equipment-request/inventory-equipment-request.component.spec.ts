import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEquipmentRequestComponent } from './inventory-equipment-request.component';

describe('InventoryEquipmentRequestComponent', () => {
  let component: InventoryEquipmentRequestComponent;
  let fixture: ComponentFixture<InventoryEquipmentRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryEquipmentRequestComponent]
    });
    fixture = TestBed.createComponent(InventoryEquipmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
