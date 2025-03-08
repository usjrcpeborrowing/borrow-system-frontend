import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
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
  @Input() items: any[] = [];
  borrowedItems: any[] = [];
  user: User;
  borrowedItemFilter: BorrowedItemFilter = {
    status: '',
    instructor: '',
    borrower: '',
    search: '',
    department: '',
  };
  openedCategory: boolean = false;
  constructor(private borrowListService: BorrowedItemsService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService.onChangeBorrowStatus().subscribe({
      next: (resp) => {
        console.log(resp);
        if (['released', 'returned', 'unreturned'].includes(resp.status)) {
          this.updateBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
        }
      },
    });
  }

  fetchBorrowedItems(): void {
    this.borrowListService.getBorrowedList(this.borrowedItemFilter).subscribe(
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
    // console.log({ body });
    // console.log(this.borrowedItems);

    // const changed_status_items = this.borrowedItems.filter((x) => x._id == id).itemborrowed.filter((item: any) => body.items.some((x) => x.equipment._id == item.equipment));
    // console.log(changed_status_items);
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
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : '';
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';
    this.borrowedItemFilter.department = params['department'] ? this.user.department[0] : this.user.department[0];
    this.fetchBorrowedItems();
  }
}
