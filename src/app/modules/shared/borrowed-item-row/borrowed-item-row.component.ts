import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { take } from 'rxjs';
import { Item } from 'src/app/models/Items';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface BorrowedItem {
  _id: string | null;
  equipment: string;
  quantity: number;
  condition: string;
  prevCondition: string;
  status: string;
  remarks: string;
}

@Component({
  selector: 'app-borrowed-item-row',
  templateUrl: './borrowed-item-row.component.html',
  styleUrls: ['./borrowed-item-row.component.css'],
})
export class BorrowedItemRowComponent implements OnInit, OnChanges {
  @Input() borrowedItem: any;
  @Output() onSelectedEvent = new EventEmitter<boolean>();
  disabled: boolean = false;
  selected: boolean = false;
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';

  constructor(private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}
  ngOnInit(): void {
    this.borrowedItemService
      .onReturnSelectedItem()
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          if (this.selected === true) {
            this.updateBorrowedItemStatus(resp);
          }
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onCheckBoxChanged(event: MatCheckboxChange) {
    this.borrowedItemService.itemSelectedSubject.next(event.checked);
    this.onSelectedEvent.emit(event.checked);
  }

  updateBorrowedItemStatus(status: string) {
    let exceed = this.borrowedItem.itemborrowed['selectedQty'] > this.borrowedItem.itemborrowed.quantity;
    let lack = this.borrowedItem.itemborrowed['selectedQty'] < 1;

    if (exceed) {
      this.snackbarService.openSnackBar('Updated items exceeds on approved quantity', 'OK');
      return;
    }

    if (lack) {
      this.snackbarService.openSnackBar('Updated items less than minimum quantity', 'OK');
      return;
    }

    if (this.borrowedItem.itemborrowed.quantity !== this.borrowedItem.itemborrowed['selectedQty']) {
      let partial_return: BorrowedItem = {
        _id: null,
        equipment: this.borrowedItem.itemborrowed['equipment']._id,
        quantity: this.borrowedItem.itemborrowed['selectedQty'],
        condition: this.borrowedItem.itemborrowed['selectedCondition'],
        prevCondition: this.borrowedItem.itemborrowed.condition,
        status: status,
        remarks: this.borrowedItem.itemborrowed.remarks,
      };

      let updates: BorrowedItem[] = [
        {
          _id: this.borrowedItem.itemborrowed._id,
          equipment: this.borrowedItem.itemborrowed['equipment']._id,
          quantity: this.borrowedItem.itemborrowed.quantity - this.borrowedItem.itemborrowed['selectedQty'],
          condition: this.borrowedItem.itemborrowed['selectedCondition'],
          prevCondition: this.borrowedItem.itemborrowed.condition,
          status: this.borrowedItem.itemborrowed['status'],
          remarks: this.borrowedItem.itemborrowed.remarks,
        },
      ];

      updates.push(partial_return);
      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowedItem._id,
        items: updates,
        status: status,
      });
    } else {
      let updates: BorrowedItem[] = [
        {
          _id: this.borrowedItem.itemborrowed._id,
          equipment: this.borrowedItem.itemborrowed['equipment']._id,
          quantity: this.borrowedItem.itemborrowed.quantity,
          condition: this.borrowedItem.itemborrowed['selectedCondition'],
          prevCondition: this.borrowedItem.itemborrowed.condition,
          status: status,
          remarks: this.borrowedItem.itemborrowed.remarks,
        },
      ];

      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowedItem._id,
        items: updates,
        status: status,
      });
    }
  }
}
