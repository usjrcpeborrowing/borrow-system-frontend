import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/Items';

@Component({
  selector: 'app-added-equipment-card',
  templateUrl: './added-equipment-card.component.html',
  styleUrls: ['./added-equipment-card.component.css'],
})
export class AddedEquipmentCardComponent implements OnChanges, OnInit {
  @Input() equipment!: Item;
  @Output() removeFromCart = new EventEmitter<Item>();
  @Output() updateQuantity = new EventEmitter<{ item: Item; quantity: number }>();
  @Output() toggleInCart = new EventEmitter<Item>();
  addedItemForm = new FormGroup({
    quantity: new FormControl(1),
  });
  quantity: number = 1;
  length: number = 0;
  constructor() {}
  ngOnInit(): void {
    this.addedItemForm.controls['quantity'].valueChanges.subscribe((resp) => {
      this.updateQuantity.emit({ item: this.equipment, quantity: this.addedItemForm.controls['quantity'].value as number });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.equipment.quantity) {
      this.length = this.equipment.quantity;
      this.updateQuantity.emit({ item: this.equipment, quantity: this.addedItemForm.controls['quantity'].value as number });
    }
  }

  removeItem() {
    this.removeFromCart.emit(this.equipment);
  }

  increaseQuantity() {
    if (this.quantity < this.length) {
      this.quantity++;
      // this.equipment.quantity = this.quantity;
      // if (this.length > this.equipment.quantity) this.equipment.quantity++;
      // this.updateQuantity.emit({ item: this.equipment, quantity: this.quantity });
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      // this.equipment.quantity = this.quantity;
      // this.updateQuantity.emit({ item: this.equipment, quantity: this.quantity });
    }
  }

  updateItemQuantity(quantity: number) {
    this.updateQuantity.emit({ item: this.equipment, quantity });
  }
  toggleItemInCart() {
    this.toggleInCart.emit(this.equipment);
  }
}
