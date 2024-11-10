import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-oic-borrowed-list',
  templateUrl: './oic-borrowed-list.component.html',
  styleUrls: ['./oic-borrowed-list.component.css'],
})
export class OicBorrowedListComponent implements OnInit {
  @Input() items: any[] = [];
  borrowedItems: any[] = [];
  borrowedItemFilter: BorrowedItemFilter = {
    status: '',
    instructor: '',
    borrower: '',
    search: '',
  };
  openedCategory: boolean = false;
  currentUser: any;
  constructor(private borrowListService: BorrowedItemsService, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService.onChangeBorrowStatus().subscribe({
      next: (resp) => {
        if (resp.status == 'approved (unrelease)' || resp.status == 'rejected') {
          this.approveBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
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

  approveBorrowedItems(items: any[], status: string, id: string) {
    const body = {
      items,
      status,
    };
    console.log(body);
    this.borrowListService.updateBorrowedItemStatus(body, id).subscribe({
      next: (resp) => {
        this.openSnackBar(resp.message, 'OK');
      },
      complete: () => {
        console.log('complete');
        this.fetchBorrowedItems();
      },
    });
  }

  openSnackBar(message: string, action: string, isError: boolean = false): void {
    let config: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    };

    if (isError) {
      config.panelClass = ['red-snackbar'];
    } else {
      config.panelClass = ['green-snackbar'];
    }

    this._snackBar.openFromComponent(SnackbarComponent, {
      ...config,
      data: {
        error: isError,
        message: message,
      },
      duration: 3000,
    });
  }

  queryParamsHandling(params: Params) {
    this.borrowedItemFilter.search = params['search'] ? params['search'] : '';
    this.borrowedItemFilter.borrower = params['borrower'] ? params['borrower'] : '';
    this.borrowedItemFilter.instructor = params['instructor'] ? params['instructor'] : this.currentUser._id;
    this.borrowedItemFilter.status = params['status'] ? params['status'] : '';

    this.fetchBorrowedItems();
  }
}
