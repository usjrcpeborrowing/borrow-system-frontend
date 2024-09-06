import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';

@Component({
  selector: 'app-equipment-detail-dialog',
  templateUrl: './equipment-detail-dialog.component.html',
  styleUrls: ['./equipment-detail-dialog.component.css'],
})
export class EquipmentDetailDialogComponent implements OnInit {
  // itemDetails: any;

  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  equipmentForm: FormGroup;
  canEdit: boolean= true;
  constructor(public dialogRef: MatDialogRef<EquipmentDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Item, private fb: FormBuilder) {
    // this.itemDetails = data;
    this.equipmentForm = fb.group({
      _id: [data._id],
      serialNo: [data.serialNo],
      equipmentType: [data.equipmentType],
      name: [data.name],
      brand: [data.brand],
      color: [data.color],
      modelNo: [data.modelNo],
      quantity: [data.quantity],
      department: [data.department],
      unit: [data.unit],
      matter: [data.matter],
      inventorytype: [data.inventorytype],
      description: [data.description],
      dateAcquired: [data.dateAcquired],
      images: fb.group({
        url: data.images.url,
        midSizeUrl: data.images.midSizeUrl,
        thumbnailUrl: data.images.thumbnailUrl,
      }),
      isborrow: [data.isborrow],
    });
  }
  ngOnInit(): void {}
}
