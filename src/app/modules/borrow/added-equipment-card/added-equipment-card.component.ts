import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/models/Items';

@Component({
  selector: 'app-added-equipment-card',
  templateUrl: './added-equipment-card.component.html',
  styleUrls: ['./added-equipment-card.component.css'],
})
export class AddedEquipmentCardComponent implements OnChanges {
  @Input() equipment!: Item;
  @Output() removeFromCart = new EventEmitter<Item>();
  @Output() updateQuantity = new EventEmitter<{ item: Item; quantity: number }>();
  @Output() toggleInCart = new EventEmitter<Item>();
  quantity: number = 0;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.equipment.quantity) this.quantity = this.equipment.quantity;
  }

  removeItem() {
    this.removeFromCart.emit(this.equipment);
  }

  increaseQuantity() {
    if (this.equipment.quantity < this.quantity) {
      this.equipment.quantity++;
      this.updateQuantity.emit({ item: this.equipment, quantity: this.equipment.quantity });
    }
  }

  decreaseQuantity() {
    if (this.equipment.quantity > 1) {
      this.equipment.quantity--;
      this.updateQuantity.emit({ item: this.equipment, quantity: this.equipment.quantity });
    }
  }

  updateItemQuantity(quantity: number) {
    this.updateQuantity.emit({ item: this.equipment, quantity });
  }
  toggleItemInCart() {
    this.toggleInCart.emit(this.equipment);
  }
}
