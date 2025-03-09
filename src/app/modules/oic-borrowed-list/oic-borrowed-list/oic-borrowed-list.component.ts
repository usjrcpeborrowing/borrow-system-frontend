import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { AuthService } from 'src/app/services/auth.service';
import { distinctUntilChanged, scan, Subscription, take, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
  };
  user: User;
  selected_count: number = 0;
  subscribe_counter: number = 0;
  constructor(private borrowListService: BorrowedItemsService, private snackbarService: SnackbarService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
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
          if (['oic_approved', 'oic_rejected'].includes(data.status) && this.subscribe_counter == this.selected_count) {
            this.updateBorrowedItemStatus(data.items, data.status, data.borrowedItemId);
          }
        },
      });
  }

  fetchBorrowedItems(): void {
    this.borrowedItems = [];
    this.borrowListService.getBorrowedList(this.borrowedItemFilter).subscribe({
      next: (resp) => {
        this.borrowedItems = resp;
        console.log(this.borrowedItems);
      },
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
        this.selected_count = 0;
        this.subscribe_counter = 0;
        this.fetchBorrowedItems();
      },
    });
  }

  queryParamsHandling(params: Params) {
    console.log(this.user.department);
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? '' : '';
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.borrowedItemFilter.department = params['department'] ? this.user.department[0] : this.user.department[0];
    this.fetchBorrowedItems();
  }
}
