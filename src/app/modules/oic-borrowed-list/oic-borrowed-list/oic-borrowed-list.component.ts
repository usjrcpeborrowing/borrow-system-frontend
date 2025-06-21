import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { AuthService } from 'src/app/services/auth.service';
import { distinctUntilChanged, scan, Subject, Subscription, take, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/Pagination';

interface DataTapped {
  borrowedItemId: string;
  items: any[];
  status: string;
}
@Component({
  selector: 'app-oic-borrowed-list',
  templateUrl: './oic-borrowed-list.component.html',
  styleUrls: ['./oic-borrowed-list.component.css'],
})
export class OicBorrowedListComponent implements OnInit {
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
    private snackbarService: SnackbarService,
    private activatedRoute: ActivatedRoute,
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
      .pipe(
        tap((data) => {
          this.data_tapped.push(data);
        })
      )
      .subscribe({
        next: (resp) => {
          let status = resp.status;
          this.subscribe_counter = this.subscribe_counter + 1;
          if (!['oic_rejected', 'oic_approved'].includes(status) && this.subscribe_counter == this.selected_count) {
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
    this.router.navigate(['/oic-borrowed-list'], navigationExtras);
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? '' : '';
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.borrowedItemFilter.department = params['department'] ? this.user.department[0] : this.user.department[0];
    this.borrowedItemFilter.className = params['className'] ? params['className'] : '';
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.fetchBorrowedItems();
  }
}
