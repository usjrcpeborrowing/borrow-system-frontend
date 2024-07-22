import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-student-borrow-card-panel',
  templateUrl: './student-borrow-card-panel.component.html',
  styleUrls: ['./student-borrow-card-panel.component.css'],
})
export class StudentBorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_return: string = 'pending_return';
  selectAll = false;

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        item.disabled = item.status !== 'released';
      });
      this.cdr.detectChanges();
    }, 0);
  }

  toggleSelectAll(event: any): void {
    this.selectAll = event.checked;
    this.items.forEach((item) => {
      if (!item.disabled) item.selected = this.selectAll;
    });
    this.cdr.detectChanges();
  }

  onItemChange(item: any): void {
    if (!item.selected) {
      this.selectAll = false;
    } else {
      this.selectAll = this.items.every((i) => i.selected);
    }
    this.cdr.detectChanges();
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

    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
    } else {
      this.borrowedItemService.changeBorrowStatus.next({ borrowedItemId: this.data._id, items: selected, status: this.status_return });
    }
  }
}
