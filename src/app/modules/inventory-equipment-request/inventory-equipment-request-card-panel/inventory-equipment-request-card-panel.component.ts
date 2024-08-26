import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/models/Constant';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EquipmentDetailDialogComponent } from '../../shared/equipment-detail-dialog/equipment-detail-dialog.component';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-inventory-equipment-request-card-panel',
  templateUrl: './inventory-equipment-request-card-panel.component.html',
  styleUrls: ['./inventory-equipment-request-card-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryEquipmentRequestCardPanelComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() equipments: Item[] = [];

  @Input() data: any;

  equipmentStatus = Constants.equipmentStatus;
  selectedStatus = '';
  status_released: string = 'released';
  status_return: string = 'returned';
  selectAll = false;
  remarks: string = 'haha';

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef, private equipmentService: EquipmentService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        item.disabled = !['approved', 'pending_return'].includes(item.status);
        console.log('remarrrsss', item.remarks);
      });
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  viewItem(item: Item): void {
    console.log('view');
    const dialogRef = this.dialog.open(EquipmentDetailDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if(resp) {
        this.equipmentService.confirmEquipmentSubject.next(resp)
      }
    });
  }

  toggleSelectAll(event: any): void {
    this.selectAll = event.checked;
    this.items.forEach((item) => {
      if (!item.disabled) item.selected = this.selectAll;
    });
    this.cdr.detectChanges();
  }

  onItemChange(item: any): void {
    if (!item.selected) {
      this.selectAll = false;
    } else {
      this.selectAll = this.items.every((i) => i.selected);
    }
    this.cdr.detectChanges();
  }

  onItemStatusChange(index: any) {
    console.log(index);
  }

  releaseItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        equipment: x.equipment._id,
        quantity: x.quantity,
        condition: x.condition,
        status: status,
        remarks: x.remarks,
      }));

    console.log(selected);
    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
    } else {
      // this.borrowedItemService.changeBorrowStatus.next({
      //   borrowedItemId: this.data._id,
      //   items: selected,
      //   status: this.status_released,
      // });
    }
  }

  returnItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        equipment: x.equipment._id,
        quantity: x.quantity,
        condition: x.condition,
        status: status,
        remarks: x.remarks,
      }));

    console.log(this.items);

    // this.borrowedItemService.changeBorrowStatus.next({
    //   borrowedItemId: this.data._id,
    //   items: selected,
    //   status: this.status_return,
    // });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
