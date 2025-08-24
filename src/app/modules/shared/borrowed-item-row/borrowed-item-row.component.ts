import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { take } from 'rxjs';
import { Item } from 'src/app/models/Items';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
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
  @Input() selected: boolean = false;
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';
  user: User;

  constructor(private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService, private authService: AuthService) {
    this.user = authService.getCurrentUser() as User;
  }
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
    if (changes['selected'] && changes['selected'].previousValue !== undefined) {
      this.selected = this.borrowedItem.itemborrowed.selectedDisabled ? false : this.selected;
      this.onCheckBoxChanged(this.selected);
    } 
  }

  onCheckBoxChanged(checked: boolean) {
    this.borrowedItemService.itemSelectedSubject.next(checked);
    this.onSelectedEvent.emit(checked);
  }

  onNoOfItemReturnTrigger(event: number) {
    this.borrowedItem.itemborrowed['selectedQty'] = event;
  }

  onRemarkUpdateTrigger(event: string) {
    this.borrowedItem.itemborrowed['remarks'] = event;
  }

  onConditionUpdateTrigger(event: string) {
    this.borrowedItem.itemborrowed['selectedCondition'] = event;
  }

  onUpdateBorrowTrigger(event: any) {
    this.borrowedItemService.itemSelectedSubject.next(true);
    this.onSelectedEvent.emit(true);
    this.borrowedItem.itemborrowed['selectedCondition'] = event.condition;
    this.borrowedItem.itemborrowed['selectedQty'] = Number(event.noItemsReturn);
    this.borrowedItem.itemborrowed['remarks'] = event.remarks;
    this.updateBorrowedItemStatus(event.status);
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
          status: this.borrowedItem.itemborrowed['status'].replace(/ /g, '_'),
          remarks: this.borrowedItem.itemborrowed.remarks,
        },
      ];

      updates.push(partial_return);

      console.log({ updates });
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

      console.log({ updates });

      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.borrowedItem._id,
        items: updates,
        status: status,
      });
    }
  }
}
