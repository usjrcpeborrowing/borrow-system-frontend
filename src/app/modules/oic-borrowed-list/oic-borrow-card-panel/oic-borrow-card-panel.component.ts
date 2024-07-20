import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-oic-borrow-card-panel',
  templateUrl: './oic-borrow-card-panel.component.html',
  styleUrls: ['./oic-borrow-card-panel.component.css'],
})
export class OicBorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() data: any;

  status_approved: string = 'approved';
  selectAll = false;

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
      });
      this.cdr.detectChanges();
    }, 0);
  }

  toggleSelectAll(event: any): void {
    this.selectAll = event.checked;
    this.items.forEach((item) => {
      item.selected = this.selectAll;
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

  approvedItems(status: string) {
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

    this.borrowedItemService.changeBorrowStatus.next({borrowedItemId: this.data._id, items: selected, status: 'approved' });
  }
}
