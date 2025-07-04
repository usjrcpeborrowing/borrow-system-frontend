import { Component, Input, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-student-borrow-card',
  templateUrl: './student-borrow-card.component.html',
  styleUrls: ['./student-borrow-card.component.css'],
})
export class StudentBorrowCardComponent {
  @Input() borrowedItems: any[] = [];
  selected_counter: number = 0;
  noresult_message: string = 'No released items to return\n  ૮(˶ㅠ︿ㅠ)ა';

  constructor(private borrowedItemService: BorrowedItemsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItems'] && changes['borrowedItems']?.currentValue) {
      this.borrowedItems.forEach((item: any) => {
        item.itemborrowed.selectedQty = item.itemborrowed.quantity;
        item.itemborrowed.selectedCondition = item.itemborrowed.condition;
        item.itemborrowed.selectedRemarks = item.itemborrowed.remarks;
        item.itemborrowed.selectedDisabled = !['released'].includes(item.itemborrowed.status);
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
