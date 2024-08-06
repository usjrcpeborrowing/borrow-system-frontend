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
  quantity: number = 1;
  length: number = 0;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.equipment.quantity) this.length = this.equipment.quantity;
  }

  removeItem() {
    this.removeFromCart.emit(this.equipment);
  }

  increaseQuantity() {
    if (this.quantity < this.length) {
      this.quantity++;
      if (this.length > this.equipment.quantity) this.equipment.quantity++;
      this.updateQuantity.emit({ item: this.equipment, quantity: this.quantity });
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.equipment.quantity--;

      this.updateQuantity.emit({ item: this.equipment, quantity: this.quantity });
    }
  }

  updateItemQuantity(quantity: number) {
    this.updateQuantity.emit({ item: this.equipment, quantity });
  }
  toggleItemInCart() {
    this.toggleInCart.emit(this.equipment);
  }
}
