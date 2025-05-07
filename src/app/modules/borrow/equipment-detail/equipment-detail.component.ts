import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  itemDetails: any;

  defaultImage = '../../../../assets/equipment_default_image.png';
  displayImage: string = '';
  updates: any[] = [];

  constructor(public dialogRef: MatDialogRef<EquipmentDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private equipmentService: EquipmentService) {
    this.itemDetails = data;
  }
  ngOnInit(): void {
    this.equipmentService.getEquipmentUpdateHistory(this.itemDetails._id).subscribe((resp) => {
      if (resp.success) {
        this.updates = resp.data[0]['revision'];
      }
    });
  }
}
