import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-oic-borrowed-list',
  templateUrl: './oic-borrowed-list.component.html',
  styleUrls: ['./oic-borrowed-list.component.css'],
})
export class OicBorrowedListComponent implements OnInit {
  @Input() items: any[] = [];
  borrowedItems: any[] = [];

  openedCategory: boolean = false;

  constructor(private borrowListService: BorrowedItemsService, private _snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.borrowListService.onChangeBorrowStatus().subscribe({
      next: (resp) => {
        if (resp.status == 'approved') {
          this.approveBorrowedItems(resp.items, resp.status, resp.borrowedItemId);
        }
      },
     
    });
  }

  fetchBorrowedItems(): void {
    this.borrowListService.getBorrowedList().subscribe(
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
    this.borrowListService.updateBorrowedItemStatus(body, id).subscribe({
      next: (resp) => {
        this.openSnackBar(resp.message, 'OK');
      },
      complete: ()=> {
        console.log('complete')
        this.fetchBorrowedItems()
      }
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
    this.fetchBorrowedItems();
  }
}
