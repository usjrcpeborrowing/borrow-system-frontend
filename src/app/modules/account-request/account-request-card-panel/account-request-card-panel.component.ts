

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-account-request-card-panel',
  templateUrl: './account-request-card-panel.component.html',
  styleUrls: ['./account-request-card-panel.component.css']
})
export class AccountRequestCardPanelComponent implements OnInit {
  @Input() users: any[] = [];
  @Input() data: any;

  status_approved: string = 'approved';
  selectAll = false;

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService) {}

  ngOnInit(): void {

  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }



}
