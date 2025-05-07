import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-detail-view-dialog',
  templateUrl: './equipment-detail-view-dialog.component.html',
  styleUrls: ['./equipment-detail-view-dialog.component.css'],
})
export class EquipmentDetailViewDialogComponent implements OnInit {
  defaultImage = '../../../../assets//equipment_default_image.png';
  updates: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public equipment: any, private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.equipmentService.getEquipmentUpdateHistory(this.equipment._id).subscribe((resp) => {
      if (resp.success) {
        this.updates = resp.data[0]['revision'];
      }
    });
  }
}
