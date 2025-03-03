import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

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
  constructor(private activatedRoute: ActivatedRoute, private borrowListService: BorrowedItemsService, private authService: AuthService) {
    this.user = authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
  }

  fetchBorrowedItems(): void {
    this.borrowedItems = [];
    this.borrowListService.getBorrowedList(this.borrowedItemFilter).subscribe({
      next: (resp) => (this.borrowedItems = resp),
      error: (err) => console.error(err),
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
