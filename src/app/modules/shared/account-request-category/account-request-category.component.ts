import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Constants } from 'src/app/models/Constant';

@Component({
  selector: 'app-account-request-category',
  templateUrl: './account-request-category.component.html',
  styleUrls: ['./account-request-category.component.css'],
})
export class AccountRequestCategoryComponent implements OnChanges, OnInit {
  filterForm: FormGroup;
  roles: string[] = Constants.userRoles;
  url: string;
  accountStatus: string[] = ['pending_approval', 'active', 'deactivated', 'rejected'];
  constructor(private fb: FormBuilder, private router: Router) {
    this.filterForm = this.fb.group({
      search: [''],
      status: [''],
      role: [''],
    });
    this.url = this.router.url.split('?')[0];
  }
  ngOnInit(): void {
    this.filterForm.controls['search'].valueChanges.pipe(debounceTime(600)).subscribe((val) => this.navigate('search', val));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'].currentValue) {
      console.log('niceeee', changes['filter']);
    }
  }

  resetFilters(): void {
    this.router.navigate([this.url]);
    this.filterForm.reset();
  }

  navigate(param: string, value = undefined) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        [param]: value ? value : this.filterForm.controls[param].value,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([this.url], navigationExtras);
  }
}
