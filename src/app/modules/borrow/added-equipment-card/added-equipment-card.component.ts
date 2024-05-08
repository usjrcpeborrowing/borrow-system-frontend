import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Items';

@Component({
selector: 'app-added-equipment-card',
templateUrl: './added-equipment-card.component.html',
styleUrls: ['./added-equipment-card.component.css']
})
export class AddedEquipmentCardComponent {
  @Input() equipmentlist!: Item;
  @Output() removeFromCart = new EventEmitter<Item>();
  @Output() updateQuantity = new EventEmitter<{ item: Item; quantity: number }>();
  
  @Output() toggleInCart = new EventEmitter<Item>();
  constructor() {}

  removeItem() {
    this.removeFromCart.emit(this.equipmentlist);
  }

  updateItemQuantity(quantity: number) {
      this.updateQuantity.emit({ item: this.equipmentlist, quantity });
  }
  toggleItemInCart() {
    this.toggleInCart.emit(this.equipmentlist);
  }
}
