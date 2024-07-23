import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css'],
})
export class BorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_released: string = 'released';
  status_return: string = 'returned';
  selectAll = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private borrowedItemService: BorrowedItemsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        item.disabled = !['approved', 'pending_return'].includes(item.status);
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

  releaseItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        equipment: x.equipment._id,
        quantity: x.quantity,
        condition: x.condition,
        status: status,
      }));

    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
    } else {
      this.borrowedItemService.changeBorrowStatus.next({
        borrowedItemId: this.data._id,
        items: selected,
        status: this.status_released,
      });
    }
  }

  returnItems(status: string) {
    const selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        equipment: x.equipment._id,
        quantity: x.quantity,
        condition: x.condition,
        status: status,
      }));

    this.borrowedItemService.changeBorrowStatus.next({
      borrowedItemId: this.data._id,
      items: selected,
      status: this.status_return,
    });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
