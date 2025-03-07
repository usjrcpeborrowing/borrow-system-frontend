import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-oic-borrow-card-panel',
  templateUrl: './oic-borrow-card-panel.component.html',
  styleUrls: ['./oic-borrow-card-panel.component.css'],
})
export class OicBorrowCardPanelComponent implements OnChanges {
  @Input() borrowedItem: any;
  selected: boolean = false;
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
}
