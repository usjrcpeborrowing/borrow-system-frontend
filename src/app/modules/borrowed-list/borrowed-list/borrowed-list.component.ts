import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-borrowed-list',
  templateUrl: './borrowed-list.component.html',
  styleUrls: ['./borrowed-list.component.css'],
})
export class BorrowedListComponent implements OnInit {
  @Input() items: any[] = [];
  borrowedItems: any[] = [];

  openedCategory: boolean = false;
  constructor(private borrowListService: BorrowedItemsService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService.onChangeBorrowStatus().subscribe({
      next: (resp) => {
        console.log(resp)
        if (resp.status == 'released' || resp.status == 'returned') {
          this.updateBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
        }
      },
    });
  }

  fetchBorrowedItems(): void {
    this.borrowListService.getBorrowedList().subscribe(
      (data) => {
        this.borrowedItems = data;
        console.log(data);
      },
      (error) => {
        console.error('Failed to load borrowed items:', error);
      }
    );
  }

  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }

  updateBorrowedItems(items: any[], status: string, id: string) {
    const body = {
      items,
      status,
    };
    this.borrowListService.updateBorrowedItemStatus(body, id).subscribe({
      next: (resp) => {
        this.snackbarService.openSnackBar(resp.message, 'OK');
        console.log(resp);
      },
      complete: () => {
        console.log('complete');
        this.fetchBorrowedItems();
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.fetchBorrowedItems();
  }
}
