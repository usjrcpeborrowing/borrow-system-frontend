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
  selector: 'app-student-borrowed-item-row',
  templateUrl: './student-borrowed-item-row.component.html',
  styleUrls: ['./student-borrowed-item-row.component.css'],
})
export class StudentBorrowedItemRowComponent implements OnInit, OnChanges {
  @Input() item!: Item;
  @Input() history: any[] = [];
  @Input() borrowId: string = '';
  @Input() selected: boolean = false;

  status_return: string = 'pending_return';
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';

  constructor(private datePipe: DatePipe, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.selected = false;
    this.borrowedItemService
      .onReturnSelectedItem()
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          if (this.item['selected'] === true) {
            this.returnItem(this.status_return);
          }
        },
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    if (changes['item'] && changes['item'].currentValue) {
      this.item['selected'] = false;
      this.item['selectedQty'] = changes['item'].currentValue.quantity;
      this.item['selectedCondition'] = changes['item'].currentValue.condition;
      this.item['selectedRemarks'] = changes['item'].currentValue.remarks;
      this.item['disabled'] = !['released', 'unreturned'].includes(changes['item'].currentValue.status);
    }

    if (changes['history']) {
      this.getHistoryLabel();
    }

    if (changes['selected'] && changes['selected'].currentValue) {
      this.item['selected'] = changes['selected'].currentValue;
    }
  }

  getHistoryLabel() {
    this.history = this.history
      .map((x) => {
        let updatedAt = this.datePipe.transform(x.updatedAt, 'mediumDate');
        return { ...x, label: `${x.status} | ${x.doer?.lastName}, ${x.doer?.firstName} ${updatedAt}` };
      })
  }

  onQuantityChanged(event: InputEvent) {
    if (event.data && parseInt(event.data) !== this.item.quantity) {
      // create service to disable everytime there is change in quantity
    }
  }

  returnItem(status: string) {
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
    // console.log('okkkey?', this.item['selected'], this.item._id, this.item.quantity, this.item['selectedQty']);
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
        status: this.status_return,
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
        status: this.status_return,
      });
    }
  }
}
