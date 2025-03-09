import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'app-student-borrowed-item-row',
  templateUrl: './student-borrowed-item-row.component.html',
  styleUrls: ['./student-borrowed-item-row.component.css'],
})
export class StudentBorrowedItemRowComponent implements OnInit, OnChanges {
  @Input() borrowId: string = '';
  @Input() itemborrowed!: Item;
  @Input() selected: boolean = false;
  @Input() histories: any[] = [];
  disabled: boolean = false;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemborrowed']) {
      this.disabled = this.itemborrowed['status'] !== 'released';
    }

    if (changes['selected'] && this.disabled == true) {
      this.selected = false;
    }

    if (changes['selected'] && this.disabled == false) {
      this.borrowedItemService.itemSelectedSubject.next(this.selected);
    }

    if (changes['histories']) {
      this.histories = this.histories.sort((a: any, b: any) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    }
  }

  onCheckBoxChanged(event: MatCheckboxChange) {
    this.borrowedItemService.itemSelectedSubject.next(event.checked);
  }

  updateBorrowedItemStatus(status: string) {
    let exceed = this.itemborrowed['selectedQty'] > this.itemborrowed.quantity;
    let lack = this.itemborrowed['selectedQty'] < 1;

    if (exceed) {
      this.snackbarService.openSnackBar('Updated items exceeds on approved quantity', 'OK');
      return;
    }

    if (lack) {
      this.snackbarService.openSnackBar('Updated items less than minimum quantity', 'OK');
      return;
    }

    if (this.itemborrowed.quantity !== this.itemborrowed['selectedQty']) {
      let partial_return: BorrowedItem = {
        _id: this.itemborrowed._id,
        equipment: this.itemborrowed['equipment']._id,
        quantity: this.itemborrowed['selectedQty'],
        condition: this.itemborrowed['selectedCondition'],
        prevCondition: this.itemborrowed.condition,
        status: status,
        remarks: this.itemborrowed.remarks,
      };

      let updates: BorrowedItem[] = [
        {
          _id: null,
          equipment: this.itemborrowed['equipment']._id,
          quantity: this.itemborrowed.quantity - this.itemborrowed['selectedQty'],
          condition: this.itemborrowed['selectedCondition'],
          prevCondition: this.itemborrowed.condition,
          status: this.itemborrowed['status'],
          remarks: this.itemborrowed.remarks,
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
          _id: this.itemborrowed._id,
          equipment: this.itemborrowed['equipment']._id,
          quantity: this.itemborrowed.quantity,
          condition: this.itemborrowed['selectedCondition'],
          prevCondition: this.itemborrowed.condition,
          status: status,
          remarks: this.itemborrowed.remarks,
        },
      ];
      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowId,
        items: updates,
        status: status,
      });
      // this.updateItemStatusEvent.emit({
      //   borrowedItemId: this.borrowId,
      //   items: updates,
      //   status: status,
      // });
    }
  }
}
