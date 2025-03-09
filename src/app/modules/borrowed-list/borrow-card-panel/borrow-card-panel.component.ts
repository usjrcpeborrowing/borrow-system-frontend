import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/models/Constant';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css'],
})
export class BorrowCardPanelComponent implements OnChanges {
  @Input() borrowedItem: any;
  selected: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['borrowedItem'] && changes['borrowedItem']?.currentValue) {
      this.borrowedItem.itemborrowed.forEach((item: any) => {
        item.selectedQty = item.quantity;
        item.selectedCondition = item.condition;
        item.selectedRemarks = item.remarks;
      });
    }
  }

  updateSelectedBorrowedItem(status: string) {
    this.borrowedItemService.returnSelectedItemSubject.next(status);
  }
}
