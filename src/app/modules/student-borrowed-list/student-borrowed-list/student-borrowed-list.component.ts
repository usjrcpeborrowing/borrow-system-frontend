import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { scan, Subject, tap } from 'rxjs';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface DataTapped {
  borrowedItemId: string;
  items: any[];
  status: string;
}

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
    className: '',
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
  data_tapped: any[] = [];

  constructor(
    private borrowListService: BorrowedItemsService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });

    this.borrowListService.onItemSelected().subscribe((resp) => {
      this.selected_count = resp === true ? this.selected_count + 1 : this.selected_count == 0 ? 0 : this.selected_count - 1;
    });

    this.borrowListService.changeBorrowStatus = new Subject<any>();
    this.borrowListService
      .onChangeBorrowStatus()
      .pipe(tap((data) => this.data_tapped.push(data)))
      .subscribe({
        next: (resp) => {
          // let borrowedItemId = resp.borrowedItemId;
          // let items = this.data_tapped
          //   .filter((data) => data.borrowedItemId == borrowedItemId)
          //   .map((x: any) => x.items)
          //   .flat(1);
          // let status = resp.status;
          // this.subscribe_counter = this.subscribe_counter + 1;
          // if (items.length && ['pending_return'].includes(status) && this.subscribe_counter == this.selected_count) {
          //   let items = this.data_tapped.map((x: any) => x.items).flat(1);
          //   let data = {
          //     borrowedItemId: borrowedItemId,
          //     items: items,
          //     status: status,
          //   };
          //   this.returnBorrowedItems(data.items, data.status, data.borrowedItemId);
          // }

          let status = resp.status;
          this.subscribe_counter = this.subscribe_counter + 1;
          if (['pending_return'].includes(status) && this.subscribe_counter == this.selected_count) {
            let data = this.borrowListService.mapDataTapped(this.data_tapped);
            this.updateBorrowedItemStatus(data);
          }
        },
      });
  }

  fetchBorrowedItems(): void {
    this.borrowedItems = [];
    this.borrowListService.getBorrowedList(this.borrowedItemFilter, this.pagination).subscribe({
      next: (resp) => {
        this.borrowedItems = resp.data;
        this.pagination.length = resp.total;
      },
      error: (err) => console.error(err),
    });
  }

  updateBorrowedItemStatus(data: DataTapped[]) {
    this.borrowListService.updateBorrowedItemStatus(data, '').subscribe({
      next: (resp) => {
        this.snackbarService.openSnackBar(resp[0].message, 'OK');
      },
      complete: () => {
        this.subscribe_counter = 0;
        this.selected_count = 0;
        this.data_tapped = [];
        this.fetchBorrowedItems();
      },
    });
  }

  paginate(event: PageEvent) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/student-borrowed-list'], navigationExtras);
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : this.user._id;
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.borrowedItemFilter.className = params['className'] ? params['className'] : '';
    this.fetchBorrowedItems();
  }
}
