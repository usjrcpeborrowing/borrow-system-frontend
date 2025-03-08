import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-student-borrowed-list',
  templateUrl: './student-borrowed-list.component.html',
  styleUrls: ['./student-borrowed-list.component.css'],
})
export class StudentBorrowedListComponent implements OnInit {
  @Input() items: any[] = [];
  borrowedItems: any[] = [];
  isloading: boolean = false;
  borrowedItemFilter: BorrowedItemFilter = {
    status: '',
    instructor: '',
    borrower: '',
    search: '',
    department: ''
  };
  currentUser: any;
  openedCategory: boolean = false;
  constructor(private borrowListService: BorrowedItemsService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService.onChangeBorrowStatus().subscribe({
      next: (resp) => {
        if (resp.status == 'pending_return') {
          this.returnBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
        }
      },
    });
  }

  fetchBorrowedItems(): void {
    this.isloading = true;
    this.borrowedItems = [];
    this.borrowListService.getBorrowedList(this.borrowedItemFilter).subscribe({
      next: (resp) => (this.borrowedItems = resp),
      error: (err) => console.error(err),
      complete: () => (this.isloading = false),
    });
  }

  categoryClicked() {
    this.openedCategory = !this.openedCategory;
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
        this.fetchBorrowedItems();
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : this.currentUser._id;
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : '';
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';

    this.fetchBorrowedItems();
  }
}
