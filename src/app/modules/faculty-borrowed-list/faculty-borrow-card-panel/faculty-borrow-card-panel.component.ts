import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-faculty-borrow-card-panel',
  templateUrl: './faculty-borrow-card-panel.component.html',
  styleUrls: ['./faculty-borrow-card-panel.component.css'],
})
export class FacultyBorrowCardPanelComponent implements OnChanges {
  @Input() borrowedItem: any;
  selected: boolean = false;
  selected_counter: number = 0;
  borrow_status: string = 'faculty_confirmed';

  constructor(private borrowedItemService: BorrowedItemsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItem'] && changes['borrowedItem']?.currentValue) {
      this.borrowedItem.itemborrowed.forEach((item: any) => {
        item.selectedQty = item.quantity;
        item.selectedCondition = item.condition;
        item.selectedRemarks = item.remarks;
      });
    }
  }

  updateSelectedBorrowedItem() {
    this.borrowedItemService.returnSelectedItemSubject.next(this.borrow_status);
  }

  onSelectedEvent(event: boolean) {
    this.selected_counter = event == true ? this.selected_counter + 1 : this.selected_counter - 1;
  }
}
