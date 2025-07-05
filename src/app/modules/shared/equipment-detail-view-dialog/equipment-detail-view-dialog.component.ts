import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-detail-view-dialog',
  templateUrl: './equipment-detail-view-dialog.component.html',
  styleUrls: ['./equipment-detail-view-dialog.component.css'],
})
export class EquipmentDetailViewDialogComponent implements OnInit {
  defaultImage = '../../../../assets//equipment_default_image.png';
  updates: any[] = [];
  user: User;
  isOIC: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public equipment: any, private equipmentService: EquipmentService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser() as User;
    this.isOIC = this.authService.hasAnyRoles(['oic', 'chairman'], this.user.role);
  }

  ngOnInit(): void {
    this.equipmentService.getEquipmentUpdateHistory(this.equipment._id).subscribe((resp) => {
      if (resp.success) {
        this.updates = resp.data[0]['revision'];
      }
    });
  }
}
