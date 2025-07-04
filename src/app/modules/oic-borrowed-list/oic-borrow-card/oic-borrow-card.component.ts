import { Component, Input, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
@Component({
  selector: 'app-oic-borrow-card',
  templateUrl: './oic-borrow-card.component.html',
  styleUrls: ['./oic-borrow-card.component.css'],
})
export class OicBorrowCardComponent {
  @Input() borrowedItems: any[] = [];
  selected_counter: number = 0;
  noresult_message: string = 'No pending items to approve/reject\n  ૮(˶ㅠ︿ㅠ)ა';
  constructor(private borrowedItemService: BorrowedItemsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItems'] && changes['borrowedItems']?.currentValue) {
      this.borrowedItems.forEach((item: any) => {
        item.itemborrowed.selectedQty = item.itemborrowed.quantity;
        item.itemborrowed.selectedCondition = item.itemborrowed.condition;
        item.itemborrowed.selectedRemarks = item.itemborrowed.remarks;
        item.itemborrowed.selectedDisabled = !['faculty confirmed', 'pending faculty confirmation'].includes(item.itemborrowed.status);
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
