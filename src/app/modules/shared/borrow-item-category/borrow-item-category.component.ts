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

  constructor(private router: Router) {}

  navigate(event: MatSelectChange) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        status: event.value,
      },
      queryParamsHandling: 'merge',
    };

    this.router.navigate(['/faculty-borrowed-list'], navigationExtras);
  }
}
