import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'app-oic-borrowed-item-row',
  templateUrl: './oic-borrowed-item-row.component.html',
  styleUrls: ['./oic-borrowed-item-row.component.css'],
})
export class OicBorrowedItemRowComponent implements OnInit, OnChanges {
  @Input() item!: Item;
  @Input() borrowId: string = '';
  @Input() selected: boolean = false;

  constructor(private datePipe: DatePipe, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.selected = false;
    this.borrowedItemService
      .onReturnSelectedItem()
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          if (this.item['selected'] === true) {
          }
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item['selected'] = false;
      this.item['selectedQty'] = this.item.quantity;
      this.item['selectedCondition'] = this.item.condition;
      this.item['selectedRemarks'] = this.item.remarks;
      this.item['disabled'] = !['released', 'unreturned'].includes(changes['item'].currentValue.status);
    }

    if (changes['selected'] && changes['selected'].currentValue) {
      this.item['selected'] = this.selected;
    }
  }

  updateBorrowStatus(status: string) {
    let exceed = this.item['selectedQty'] > this.item.quantity;
    let lack = this.item['selectedQty'] < 1;
    if (exceed) {
      this.snackbarService.openSnackBar('Updated items exceeds on approved quantity', 'OK');
      return;
    }

    if (lack) {
      this.snackbarService.openSnackBar('Updated items less than minimum quantity', 'OK');
      return;
    }

    if (this.item.quantity !== this.item['selectedQty']) {
      let partial_return: BorrowedItem = {
        _id: null,
        equipment: this.item['equipment']._id,
        quantity: this.item['selectedQty'],
        condition: this.item['selectedCondition'],
        prevCondition: this.item.condition,
        status: status,
        remarks: this.item.remarks,
      };

      let updates: BorrowedItem[] = [
        {
          _id: this.item._id,
          equipment: this.item['equipment']._id,
          quantity: this.item.quantity - this.item['selectedQty'],
          condition: this.item['selectedCondition'],
          prevCondition: this.item.condition,
          status: this.item['status'],
          remarks: this.item.remarks,
        },
      ];

      updates.push(partial_return);
      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowId,
        items: updates,
        status: status,
      });
    } else {
      let updates: BorrowedItem[] = [
        {
          _id: this.item._id,
          equipment: this.item['equipment']._id,
          quantity: this.item.quantity,
          condition: this.item['selectedCondition'],
          prevCondition: this.item.condition,
          status: status,
          remarks: this.item.remarks,
        },
      ];

      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowId,
        items: updates,
        status: status,
      });
    }
  }
}
