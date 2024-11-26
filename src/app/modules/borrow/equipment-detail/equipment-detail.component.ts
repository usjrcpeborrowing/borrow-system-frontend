import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent {
  itemDetails: any;

  defaultImage = '../../../../assets/equipment_default_image.png';
  displayImage: string = '';
  constructor(public dialogRef: MatDialogRef<EquipmentDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.itemDetails = data;
  }
}
