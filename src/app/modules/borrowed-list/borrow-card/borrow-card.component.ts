import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-borrow-card',
  templateUrl: './borrow-card.component.html',
  styleUrls: ['./borrow-card.component.css'],
})
export class BorrowCardComponent implements OnChanges {
  @Input() borrowedItems: any[] = [];
  selected_counter: number = 0;
  noresult_message: string = 'No items to release/return \n  ૮(˶ㅠ︿ㅠ)ა';

  constructor(private borrowedItemService: BorrowedItemsService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItems'] && changes['borrowedItems']?.currentValue) {
      this.borrowedItems.forEach((item: any) => {
        item.itemborrowed.selectedQty = item.itemborrowed.quantity;
        item.itemborrowed.selectedCondition = item.itemborrowed.condition;
        item.itemborrowed.selectedRemarks = item.itemborrowed.remarks;
        item.itemborrowed.selectedDisabled = !['oic approved', 'pending return'].includes(item.itemborrowed.status);
        if (item.itemborrowed.selectedDisabled) {
          item.itemborrowed.selectedDisabled = !(item.purpose == 'class_use' && item.itemborrowed.status == 'faculty confirmed');
        }
      });
    }
  }

  onSelectedEvent(event: boolean) {
    this.selected_counter = event == true ? this.selected_counter + 1 : this.selected_counter - 1;
  }

  updateSelectedBorrowedItem(status: string) {
    this.borrowedItemService.returnSelectedItemSubject.next(status);
  }
}
