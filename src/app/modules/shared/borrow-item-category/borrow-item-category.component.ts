import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Constants } from 'src/app/models/Constant';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-borrow-item-category',
  templateUrl: './borrow-item-category.component.html',
  styleUrls: ['./borrow-item-category.component.css'],
})
export class BorrowItemCategoryComponent implements OnInit {
  itemStatus: string[] = [];
  borrowstatus: string[] = Constants.borrowStatus;
  classNames: string[] = [];
  url: string;
  user: User;
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private borrowedItemService: BorrowedItemsService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.url = this.router.url.split('?')[0];
    this.user = this.authService.getCurrentUser() as User;
    this.filterForm = this.fb.group({
      status: [''],
      className: [''],
    });
  }
  ngOnInit(): void {
    this.borrowedItemService.getClassNamesByIntructor(this.user._id).subscribe((resp) => (this.classNames = resp.data));
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
  }

  navigate(param: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        status: 'all',
        [param]: this.filterForm.controls[param].value,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([this.router.url.split('?')[0]], navigationExtras);
  }

  resetFilters(): void {
    this.router.navigate([this.url]);
  }

  queryParamsHandling(params: Params) {
    this.filterForm.controls['status'].patchValue(params['status']);
    this.filterForm.controls['className'].patchValue(params['className']);
  }
}
