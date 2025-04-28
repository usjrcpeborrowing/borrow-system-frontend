import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/models/Constant';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EquipmentDetailDialogComponent } from '../../shared/equipment-detail-dialog/equipment-detail-dialog.component';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { EquipmentDetailViewDialogComponent } from '../../shared/equipment-detail-view-dialog/equipment-detail-view-dialog.component';
import { InventoryUpdateService } from 'src/app/services/inventory-update.service';
@Component({
  selector: 'app-inventory-equipment-request-card-panel',
  templateUrl: './inventory-equipment-request-card-panel.component.html',
  styleUrls: ['./inventory-equipment-request-card-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryEquipmentRequestCardPanelComponent implements OnInit, OnChanges {
  @Input() equipments: Item[] = [];
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';

  equipmentStatus = Constants.equipmentStatus;
  selectAll = false;
  currentUser: User;
  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private equipmentService: EquipmentService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private inventoryUpdateService: InventoryUpdateService
  ) {
    this.currentUser = authService.getCurrentUser() as User;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipments']) {
      this.equipments.forEach((item) => {
        item['selected'] = false;
        item['disabled'] = !this.authService.hasAnyRoles(['oic', 'chairman'], this.currentUser.role);
      });
    }
  }

  viewItem(item: Item): void {
    const dialogRef = this.dialog.open(EquipmentDetailViewDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'confirm') {
        this.equipmentService.confirmEquipmentSubject.next(item);
      }
    });
  }

  editItem(item: Item) {
    const dialogRef = this.dialog.open(EquipmentDetailDialogComponent, {
      data: {
        item,
        action: 'Confirm',
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'confirm') {
        this.equipmentService.confirmEquipmentSubject.next(item);
      }
    });
  }

  toggleSelectAll(event: MatCheckboxChange): void {
    this.equipments.forEach((item) => {
      if (!item['disabled']) item['selected'] = event.checked;
    });
  }

  onItemChange(event: MatCheckboxChange, item: Item): void {
    this.inventoryUpdateService.selectedInventoryUpdateSubject.next({
      equipmentId: item._id,
      selected: event.checked,
    });
  }

  confirmSelectedEquipments() {
    let body = {
      equipmentIds: this.equipments.filter((item) => item['selected']).map((x) => x._id),
      confirmed: true,
    };
    this.equipmentService.confirmSelectedEquipments.next(body);
  }

  rejectSelectedEquipments() {
    let body = {
      equipmentIds: this.equipments.filter((item) => item['selected']).map((x) => x._id),
      confirmed: false,
    };
    this.equipmentService.confirmSelectedEquipments.next(body);
  }
}
