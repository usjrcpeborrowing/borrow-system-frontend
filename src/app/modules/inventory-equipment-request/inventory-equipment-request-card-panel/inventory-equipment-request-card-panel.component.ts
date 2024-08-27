import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/models/Constant';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EquipmentDetailDialogComponent } from '../../shared/equipment-detail-dialog/equipment-detail-dialog.component';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-inventory-equipment-request-card-panel',
  templateUrl: './inventory-equipment-request-card-panel.component.html',
  styleUrls: ['./inventory-equipment-request-card-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryEquipmentRequestCardPanelComponent implements OnInit, OnChanges {
  @Input() equipments: Item[] = [];

  equipmentStatus = Constants.equipmentStatus;
  selectAll = false;
  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef, private equipmentService: EquipmentService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipments']) {
      this.equipments.forEach((item) => {
        item['selected'] = false;
      });
    }
  }

  viewItem(item: Item): void {
    console.log('view');
    const dialogRef = this.dialog.open(EquipmentDetailDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.equipmentService.confirmEquipmentSubject.next(resp);
      }
    });
  }

  toggleSelectAll(event: MatCheckboxChange): void {
    this.equipments.forEach((item) => {
      item['selected'] = event.checked;
    });
  }

  onItemChange(event: MatCheckboxChange, item: Item): void {
    item['selected'] = event.checked;
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
