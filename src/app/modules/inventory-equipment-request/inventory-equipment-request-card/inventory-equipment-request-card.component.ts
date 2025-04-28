import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
import { InventoryUpdateService } from 'src/app/services/inventory-update.service';

interface SelectedUpdate {
  equipmentId: string;
  selected: boolean;
}
@Component({
  selector: 'app-inventory-equipment-request-card',
  templateUrl: './inventory-equipment-request-card.component.html',
  styleUrls: ['./inventory-equipment-request-card.component.css'],
})
export class InventoryEquipmentRequestCardComponent {
  @Input() equipments: Item[] = [];
  selectedInventoryUpdates: SelectedUpdate[] = [];

  constructor(private inventoryUpdateService: InventoryUpdateService, private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.inventoryUpdateService.onSelectedInventoryUpdateSubject().subscribe((resp) => {
      if (resp.selected) {
        this.selectedInventoryUpdates.push(resp);
      } else {
        this.selectedInventoryUpdates = this.selectedInventoryUpdates.filter((item) => item.equipmentId !== resp.equipmentId);
      }
    });
  }

  confirmSelected() {
    let body = {
      equipmentIds: this.selectedInventoryUpdates.map((x) => x.equipmentId),
      confirmed: true,
    };
    this.equipmentService.confirmSelectedEquipments.next(body);
  }
}
