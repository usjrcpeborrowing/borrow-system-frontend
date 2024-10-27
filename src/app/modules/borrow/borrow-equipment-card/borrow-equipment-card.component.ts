import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
import { EquipmentDetailComponent } from '../equipment-detail/equipment-detail.component';
@Component({
  selector: 'app-borrow-equipment-card',
  templateUrl: './borrow-equipment-card.component.html',
  styleUrls: ['./borrow-equipment-card.component.css'],
})
export class BorrowEquipmentCardComponent implements OnInit {
  opened: boolean = true;
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  dialogWidth: string = '45%';
  available: string = 'available';
  @Input() equipment: Item | any;
  @Input() item: Item = {} as Item | any;
  @Output() addToCart = new EventEmitter<Item>();
  constructor(public dialog: MatDialog, private _snackbar: MatSnackBar, private equipmentService: EquipmentService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    const midsizeurl = this.equipment?.images?.midSizeUrl?.length ? this.equipment?.images?.midSizeUrl : '';
    const id: string = midsizeurl.substring(midsizeurl.lastIndexOf('/d/') + 3, midsizeurl.lastIndexOf('/view'));
    // this.displayImage = `https://drive.google.com/thumbnail?id=${id}&&sz=w1000`;

    this.breakpointObserver.observe(['(max-width: 500px)']).subscribe((state: BreakpointState) => {
      this.dialogWidth = state.matches ? '100%' : '45%';
    });

    this.available = this.equipment.availability == 'available' ? 'available' : 'unavailable';
  }

  addEquipment() {
    // this.equipmentService.productSubject.next(this.equipment);

    // if (!this.item.inventorytype || this.item.inventorytype === 'nonInventory') {
    //   this.item.quantity = 1;
    // }
    this.addToCart.emit(this.equipment);
    this._snackbar.open('Item Added Successfully', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['snackbar-style'],
    });
  }

  viewItemDetails(): void {
    this.dialog.open(EquipmentDetailComponent, {
      data: this.equipment,
    });
  }
}
