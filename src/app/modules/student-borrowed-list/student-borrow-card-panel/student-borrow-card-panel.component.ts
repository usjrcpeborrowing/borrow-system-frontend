import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-student-borrow-card-panel',
  templateUrl: './student-borrow-card-panel.component.html',
  styleUrls: ['./student-borrow-card-panel.component.css'],
})
export class StudentBorrowCardPanelComponent implements OnChanges {
  @Input() borrowedItem: any;
  selected: boolean = false;
  selected_counter: number = 0;
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

  updateSelectedBorrowedItem(status:string) {
    this.borrowedItemService.returnSelectedItemSubject.next(status);
  }

  onSelectedEvent(event: boolean) {
    this.selected_counter = event == true ? this.selected_counter + 1 : this.selected_counter - 1;
  }
}
