import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { scan } from 'rxjs';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { Pagination } from 'src/app/models/Pagination';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-borrowed-list',
  templateUrl: './borrowed-list.component.html',
  styleUrls: ['./borrowed-list.component.css'],
})
export class BorrowedListComponent implements OnInit {
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
  constructor(
    private borrowListService: BorrowedItemsService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getCurrentUser() as User;
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
          if (['released', 'returned', 'unreturned'].includes(data.status) && this.subscribe_counter == this.selected_count) {
            this.updateBorrowedItemStatus(data.items, data.status, data.borrowedItemId);
          }
        },
      });
  }

  fetchBorrowedItems(): void {
    this.borrowListService.getBorrowedList(this.borrowedItemFilter, this.pagination).subscribe({
      next: (resp) => {
        this.borrowedItems = resp.data;
        this.pagination.length = resp.total;
      },
      error: (err) => console.error(err),
    });
  }

  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }

  updateBorrowedItemStatus(items: any[], status: string, id: string) {
    const body = {
      items,
      status,
    };
    this.borrowListService.updateBorrowedItemStatus(body, id).subscribe({
      next: (resp) => this.snackbarService.openSnackBar(resp.message, 'OK'),
      complete: () => {
        this.selected_count = 0;
        this.subscribe_counter = 0;
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
    this.router.navigate(['/borrowed-list'], navigationExtras);
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : '';
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.borrowedItemFilter.department = params['department'] ? this.user.department[0] : this.user.department[0];
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.fetchBorrowedItems();
  }
}
