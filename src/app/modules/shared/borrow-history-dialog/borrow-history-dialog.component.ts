import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowHistory } from 'src/app/models/BorrowHistory';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-borrow-history-dialog',
  templateUrl: './borrow-history-dialog.component.html',
  styleUrls: ['./borrow-history-dialog.component.css'],
})
export class BorrowHistoryDialogComponent implements OnInit {
  borrowHistory: BorrowHistory[] = [];
  currentBorrowHistory: BorrowHistory[] = [];
  constructor(private borrowedItemService: BorrowedItemsService, @Inject(MAT_DIALOG_DATA) public equipmentId: string) {}
  ngOnInit(): void {
    this.borrowedItemService.getBorrowedItemHistory(this.equipmentId).subscribe({
      next: (resp) => {
        this.borrowHistory = resp.data;
        this.currentBorrowHistory = this.findReleasedStatus();
        console.log(this.currentBorrowHistory);
      },
      error: (err: any) => console.error(err),
    });
  }

  findReleasedStatus() {
    let filtered = this.borrowHistory.filter((x) => x.status == 'released');
    this.borrowHistory = this.borrowHistory.filter((x) => !filtered.some((y) => x._id == y._id));
    return filtered;
  }
}
