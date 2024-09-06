import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEquipmentRequestCardPanelComponent } from './inventory-equipment-request-card-panel.component';

describe('InventoryEquipmentRequestCardPanelComponent', () => {
  let component: InventoryEquipmentRequestCardPanelComponent;
  let fixture: ComponentFixture<InventoryEquipmentRequestCardPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryEquipmentRequestCardPanelComponent]
    });
    fixture = TestBed.createComponent(InventoryEquipmentRequestCardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
