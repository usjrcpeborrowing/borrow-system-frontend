import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css']
})
export class BorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_released: string = 'released';
  status_return: string = 'returned';
  selectAll = false;

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService) {}

  ngOnInit(): void {
    // Initialize the selected property for each item
    setTimeout(() => {
      this.items.forEach(item => {
        item.selected = false;
      });
      this.cdr.detectChanges();
    }, 0);
  }

  toggleSelectAll(event: any): void {
    this.selectAll = event.checked;
    this.items.forEach(item => {
      item.selected = this.selectAll;
    });
    this.cdr.detectChanges();
  }

  onItemChange(item: any): void {
    // If any item is unchecked, uncheck the selectAll checkbox
    if (!item.selected) {
      this.selectAll = false;
    } else {
      // If all items are checked, check the selectAll checkbox
      this.selectAll = this.items.every(i => i.selected);
    }
    this.cdr.detectChanges();
  }

  releaseItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => {
        return {
          equipment: x.equipment._id,
          quantity: x.quantity,
          condition: x.condition,
          status: status,
        };
      });

    this.borrowedItemService.changeBorrowStatus.next({borrowedItemId: this.data._id, items: selected, status: this.status_released });
  }

  returnItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => {
        return {
          equipment: x.equipment._id,
          quantity: x.quantity,
          condition: x.condition,
          status: status,
        };
      });

    this.borrowedItemService.changeBorrowStatus.next({borrowedItemId: this.data._id, items: selected, status: this.status_return });
  }
}
