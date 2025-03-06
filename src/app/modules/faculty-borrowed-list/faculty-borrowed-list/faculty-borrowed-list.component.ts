import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, scan, shareReplay, take, takeLast, takeUntil, tap, toArray } from 'rxjs';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
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
        this.fetchBorrowedItems();
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : this.user._id;
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';

    this.fetchBorrowedItems();
  }
}
