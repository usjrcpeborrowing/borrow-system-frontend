import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { scan } from 'rxjs';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-student-borrowed-list',
  templateUrl: './student-borrowed-list.component.html',
  styleUrls: ['./student-borrowed-list.component.css'],
})
export class StudentBorrowedListComponent implements OnInit {
  openedCategory: boolean = false;
  borrowedItems: any[] = [];
  borrowedItemFilter: BorrowedItemFilter = {
    status: '',
    instructor: '',
    borrower: '',
    search: '',
    department: '',
  };
  user: User;
  selected_count: number = 0;
  subscribe_counter: number = 0;
  constructor(private borrowListService: BorrowedItemsService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService) {
    this.user = authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService
      .onChangeBorrowStatus()
      .pipe(
        scan<any[], any>((acc, data) => {
          acc.push(data);
          while (acc.length > this.selected_count) {
            acc.shift();
          }
          return acc;
        }, [])
      )
      .subscribe({
        next: (resp) => {
          if (resp.status == 'pending_return') {
            this.returnBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
          }
        },
      });
  }

  fetchBorrowedItems(): void {
    this.borrowedItems = [];
    this.borrowListService.getBorrowedList(this.borrowedItemFilter).subscribe({
      next: (resp) => (this.borrowedItems = resp),
      error: (err) => console.error(err),
    });
  }

  returnBorrowedItems(items: any[], status: string, id: string) {
    const body = {
      items,
      status,
    };

    this.borrowListService.updateBorrowedItemStatus(body, id).subscribe({
      next: (resp) => {
        this.snackbarService.openSnackBar(resp.message, 'OK');
      },
      complete: () => {
        this.subscribe_counter = 0;
        this.selected_count = 0;
        this.fetchBorrowedItems();
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : this.user._id;
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.fetchBorrowedItems();
  }
}
