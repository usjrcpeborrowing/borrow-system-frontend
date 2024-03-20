import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-borrow-equipment-card',
  templateUrl: './borrow-equipment-card.component.html',
  styleUrls: ['./borrow-equipment-card.component.css'],
})
export class BorrowEquipmentCardComponent {
  opened: boolean = true;
  @Input() equipment: Item | any;

  constructor(private _snackbar: MatSnackBar, private equipmentService: EquipmentService) {}

  addEquipment() {
    this.equipmentService.productSubject.next(this.equipment);
    this._snackbar.open('PRODUCT SUCCESSFULLY ADDED', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      // duration: 2000,
      panelClass: ['custom-snackbar'],
    });
  }
}
