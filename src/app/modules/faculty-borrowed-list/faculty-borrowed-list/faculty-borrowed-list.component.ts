import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, scan, shareReplay, take, takeLast, takeUntil, tap, toArray } from 'rxjs';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-faculty-borrowed-list',
  templateUrl: './faculty-borrowed-list.component.html',
  styleUrls: ['./faculty-borrowed-list.component.css'],
})
export class FacultyBorrowedListComponent implements OnInit {
  openedCategory: boolean = false;
  borrowedItems: any[] = [];
  borrowedItemFilter: BorrowedItemFilter = {
    status: '',
    instructor: '',
    borrower: '',
    search: '',
    department: '',
  };
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 10,
    pageSizeOption: [5, 10, 25, 50],
  };
  user: User;
  selected_count: number = 0;
  subscribe_counter: number = 0;
  constructor(private activatedRoute: ActivatedRoute, private borrowListService: BorrowedItemsService, private authService: AuthService, private snackbarService: SnackbarService) {
    this.user = authService.getCurrentUser() as User;
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });

    this.borrowListService.onItemSelected().subscribe((resp) => {
      this.selected_count = resp === true ? this.selected_count + 1 : this.selected_count == 0 ? 0 : this.selected_count - 1;
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
          let items = resp.map((x: any) => x.items).flat(1);
          let data = { borrowedItemId: resp[0].borrowedItemId, items: items, status: resp[0].status };
          this.subscribe_counter = this.subscribe_counter + 1;
          if (data.status == 'faculty_confirmed' && this.subscribe_counter == this.selected_count) {
            this.updateBorrowedItemStatus(data.items, data.status, data.borrowedItemId);
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

  updateBorrowedItemStatus(items: any[], status: string, id: string) {
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

  paginate(event: PageEvent) {
    console.log(event);
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : this.user._id;
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.fetchBorrowedItems();
  }
}
