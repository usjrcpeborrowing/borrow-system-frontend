import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-faculty-borrow-card',
  templateUrl: './faculty-borrow-card.component.html',
  styleUrls: ['./faculty-borrow-card.component.css'],
})
export class FacultyBorrowCardComponent implements OnChanges {
  @Input() borrowedItems: any[] = [];
  selected_counter: number = 0;
  borrow_status: string = 'faculty_confirmed';

  constructor(private borrowedItemService: BorrowedItemsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItems'] && changes['borrowedItems']?.currentValue) {
      this.borrowedItems.forEach((item: any) => {
        item.itemborrowed.selectedQty = item.itemborrowed.quantity;
        item.itemborrowed.selectedCondition = item.itemborrowed.condition;
        item.itemborrowed.selectedRemarks = item.itemborrowed.remarks;
      });
    }
  }

  onSelectedEvent(event: boolean) {
    this.selected_counter = event == true ? this.selected_counter + 1 : this.selected_counter - 1;
  }

  updateSelectedBorrowedItem() {
    this.borrowedItemService.returnSelectedItemSubject.next(this.borrow_status);
  }
}
