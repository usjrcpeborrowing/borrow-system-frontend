
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-inventory-equipment-request-card',
  templateUrl: './inventory-equipment-request-card.component.html',
  styleUrls: ['./inventory-equipment-request-card.component.css']
})
export class InventoryEquipmentRequestCardComponent {

  @Input() items: any[] = [];
  

  
  ngOnInit(): void {
  }
}