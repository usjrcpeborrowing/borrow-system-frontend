import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-student-borrow-card-panel',
  templateUrl: './student-borrow-card-panel.component.html',
  styleUrls: ['./student-borrow-card-panel.component.css'],
})
export class StudentBorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_return: string = 'pending_return';
  selectAll = false;
  borrower: string = '';
  instructor: string = '';
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        item.selectedQty = item.quantity;
        item.selectedCondition = item.condition;
        item.selectedRemarks = item.remarks;
        item.disabled = !['released', 'unreturned'].includes(item.status);
      });
      this.cdr.detectChanges();
    }, 0);

    this.borrower = this.data.borrower.firstName + ' ' + this.data.borrower.lastName;
    this.instructor = this.data.instructor.firstName + ' ' + this.data.instructor.lastName;
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

  returnItems(status: string) {
    const partiallyReturned = this.items
      .filter((item) => item.quantity !== item.selectedQty)
      .map((x) => ({
        _id: null,
        equipment: x.equipment._id,
        quantity: x.selectedQty,
        condition: x.selectedCondition,
        prevCondition: x.condition,
        status: x.selected ? status : x.status,
        remarks: x.selectedRemarks,
      }));
    console.log({ partiallyReturned });
    let selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        _id: x._id,
        equipment: x.equipment._id,
        quantity: x.quantity !== x.selectedQty ? x.quantity - x.selectedQty : x.quantity,
        condition: x.quantity !== x.selectedQty ? x.condition : x.selectedCondition,
        prevCondition: x.condition,
        status: x.quantity !== x.selectedQty ? x.status : status,
        remarks: x.quantity !== x.selectedQty ? x.remarks : x.selectedRemarks,
      }));
    selected = selected.concat(partiallyReturned);
    console.log({ selected });

    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
      return;
    }
    this.borrowedItemService.changeBorrowStatus.next({
      borrowedItemId: this.data._id,
      items: selected,
      status: this.status_return,
    });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  actionDisabled() {
    return this.items.filter((item) => item.selected).length == 0;
  }
}
