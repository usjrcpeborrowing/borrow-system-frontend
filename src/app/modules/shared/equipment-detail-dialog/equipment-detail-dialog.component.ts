import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';

type Data = {
  item: Item;
  action: 'Confirm' | 'Edit';
};
@Component({
  selector: 'app-equipment-detail-dialog',
  templateUrl: './equipment-detail-dialog.component.html',
  styleUrls: ['./equipment-detail-dialog.component.css'],
})
export class EquipmentDetailDialogComponent implements OnInit {
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  equipmentForm: FormGroup;
  canEdit: boolean = true;
  constructor(public dialogRef: MatDialogRef<EquipmentDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Data, private fb: FormBuilder) {
    // this.itemDetails = data;
    this.equipmentForm = fb.group({
      _id: [data.item._id],
      serialNo: [data.item.serialNo],
      equipmentType: [data.item.equipmentType],
      name: [data.item.name],
      brand: [data.item.brand],
      color: [data.item.color],
      modelNo: [data.item.modelNo],
      quantity: [data.item.quantity],
      department: [data.item.department],
      unit: [data.item.unit],
      matter: [data.item.matter],
      inventorytype: [data.item.inventorytype],
      description: [data.item.description],
      dateAcquired: [data.item.dateAcquired],
      location: [data.item.location],
      images: fb.group({
        url: data.item.images.url,
        midSizeUrl: data.item.images.midSizeUrl,
        thumbnailUrl: data.item.images.thumbnailUrl,
      }),
      isborrow: [data.item.isborrow],
    });
  }
  ngOnInit(): void {}
}
