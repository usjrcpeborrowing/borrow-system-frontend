
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/Items';
@Component({
  selector: 'app-inventory-equipment-request-card',
  templateUrl: './inventory-equipment-request-card.component.html',
  styleUrls: ['./inventory-equipment-request-card.component.css']
})
export class InventoryEquipmentRequestCardComponent {

  @Input() equipments: Item[] = [];
  ngOnInit(): void {
  }
}