import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Constants } from 'src/app/models/Constant';
import { InventoryFilter } from 'src/app/models/InventoryFilter';

@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.css'],
})
export class InventoryCategoryComponent implements OnInit, OnChanges {
  @Input() filter!: InventoryFilter;
  url: string;
  filterForm: FormGroup;
  user: User;
  equipmenttypes: string[] = [];
  categories: string[] = [];
  locations: string[] = [];
  brands: string[] = [];
  matters: string[] = Constants.equipmentMatterType;
  inventorytypes: string[] = Constants.equipmentInventoryType;
  departments: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private equipmentService: EquipmentService, private authService: AuthService) {
    this.filterForm = this.fb.group({
      equipmenttype: [''],
      categories: [''],
      brand: [''],
      mattertype: [''],
      inventorytype: [''],
      location: [''],
      department: [''],
      dateRange: this.fb.group({
        start: [''],
        end: [''],
      }),
      recentlyBorrowed: this.fb.group({
        start: [''],
        end: [''],
      }),
      search: [''],
    });

    this.user = this.authService.getCurrentUser() as User;
    this.url = this.router.url.split('?')[0];
    this.departments = this.user.department;
  }

  ngOnInit(): void {
    this.getEquipments();
    this.getBrands();
    this.getLocations();
    this.getCategories();

    this.filterForm.controls['search'].valueChanges.pipe(debounceTime(600)).subscribe((val) => this.navigate('search', val));
    this.filterForm.controls['dateRange'].valueChanges.subscribe((value) => {
      let { start = '', end = '' } = value;
      start = start instanceof Date ? start.toLocaleDateString('en-CA') : '';
      end = end instanceof Date ? end.toLocaleDateString('en-CA') : '';
      const dateRangeString = end ? `${start}|${end}` : start;
      if (dateRangeString) {
        this.navigate('dateAcquired', dateRangeString);
      }
    });

    this.filterForm.controls['recentlyBorrowed'].valueChanges.subscribe((value) => {
      let { start = '', end = '' } = value;
      console.log(value);
      start = start instanceof Date ? start.toLocaleDateString('en-CA') : '';
      end = end instanceof Date ? end.toLocaleDateString('en-CA') : '';
      const dateRangeString = end ? `${start}|${end}` : start;
      if (dateRangeString) {
        this.navigate('recentlyBorrowed', dateRangeString);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'].currentValue) {
      console.log('niceeee', changes['filter']);
      const filters = changes['filter'].currentValue;
      const [start, end] = filters.dateAcquired.split('|');
      const [recent_start, recent_end] = filters.recentlyBorrowed ? filters.recentlyBorrowed.split('|') : '';
      this.filterForm.controls['equipmenttype'].patchValue(filters.equipmenttype);
      this.filterForm.controls['categories'].patchValue(filters.categories);
      this.filterForm.controls['mattertype'].patchValue(filters.mattertype);
      this.filterForm.controls['brand'].patchValue(filters.brand);
      this.filterForm.controls['inventorytype'].patchValue(filters.brand);
      this.filterForm.controls['location'].patchValue(filters.location);
      this.filterForm.controls['search'].patchValue(filters.name);
      this.filterForm.controls['dateRange'].patchValue({
        start: start,
        end: end,
      });
      this.filterForm.controls['recentlyBorrowed'].patchValue({
        start: recent_start,
        end: recent_end,
      });
    }
  }

  getEquipments() {
    this.equipmentService.getEquipmentTypes(this.user.department).subscribe({
      next: (resp) => (this.equipmenttypes = resp.data),
    });
  }

  getBrands() {
    this.equipmentService.getBrandList(this.user.department).subscribe({
      next: (resp) => (this.brands = resp.data),
    });
  }

  getCategories() {
    this.equipmentService.getCategories(this.user.department).subscribe({
      next: (resp) => (this.categories = resp.data),
    });
  }

  getLocations() {
    this.equipmentService.getLocationList(this.user.department).subscribe({
      next: (resp) => (this.locations = resp.data),
    });
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
