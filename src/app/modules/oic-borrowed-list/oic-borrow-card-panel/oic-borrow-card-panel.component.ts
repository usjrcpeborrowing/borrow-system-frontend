import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-oic-borrow-card-panel',
  templateUrl: './oic-borrow-card-panel.component.html',
  styleUrls: ['./oic-borrow-card-panel.component.css'],
})
export class OicBorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_approved: string = 'approved';
  status_rejected: string = 'rejected';
  selectAll = false;
  borrower: string = '';
  instructor: string = '';

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        // item.disabled = ['approved', 'rejected'].includes(item.status);
        item.disabled = item.status !== 'pending_approval';
      });
      console.log(this.items);
      this.cdr.detectChanges();
    }, 0);

    this.borrower = this.data.borrower.firstName + ' ' + this.data.borrower.lastName;
    this.instructor = this.data.instructor.firstName + ' ' + this.data.instructor.lastName;
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

  updateStatus(status: string) {
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
      return;
    }
    this.borrowedItemService.changeBorrowStatus.next({ borrowedItemId: this.data._id, items: selected, status: status });
  }
  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
