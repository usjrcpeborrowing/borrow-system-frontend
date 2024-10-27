import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { NavigationExtras, Router } from '@angular/router';
import { Constants } from 'src/app/models/Constant';

@Component({
  selector: 'app-borrow-item-category',
  templateUrl: './borrow-item-category.component.html',
  styleUrls: ['./borrow-item-category.component.css'],
})
export class BorrowItemCategoryComponent {
  itemStatus: string[] = [];
  borrowstatus: string[] = Constants.borrowStatus;
  url: string;

  constructor(private router: Router) {
    this.url = this.router.url.split('?')[0];
  }

  navigate(event: MatSelectChange) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        status: event.value,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([this.router.url.split('?')[0]], navigationExtras);
  }

  resetFilters(): void {
    this.router.navigate([this.url]);
  }
}
