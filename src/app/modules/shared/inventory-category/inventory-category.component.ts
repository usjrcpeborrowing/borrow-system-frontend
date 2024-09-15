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
  locations: string[] = [];
  brands: string[] = [];
  matters: string[] = Constants.equipmentMatterType;
  inventorytypes: string[] = Constants.equipmentInventoryType;

  constructor(private fb: FormBuilder, private router: Router, private equipmentService: EquipmentService, private authService: AuthService) {
    this.filterForm = this.fb.group({
      equipmenttype: [''],
      brand: [''],
      mattertype: [''],
      inventorytype: [''],
      location: [''],
      dateRange: this.fb.group({
        start: [''],
        end: [''],
      }),
      search: [''],
    });

    this.user = this.authService.getCurrentUser() as User;
    this.url = this.router.url.split('?')[0];
  }

  ngOnInit(): void {
    this.getEquipments();
    this.getBrands();
    this.getLocations();

    this.filterForm.controls['search'].valueChanges.pipe(debounceTime(600)).subscribe((val) => this.navigate('search', val));
    this.filterForm.controls['dateRange'].valueChanges.subscribe((value) => {
      let start = value?.start ? value.start.toISOString().split('T').shift() : '';
      let end = value?.end ? value?.end?.toISOString().split('T').shift() : '';
      const dateRangeString = end ? `${start}|${end}` : start;
      this.navigate('dateAcquired', dateRangeString);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      console.log('niceeee', changes['filter']);
      const filters = changes['filter'].currentValue;
      const [start, end] = filters.dateAcquired.split('|');
      this.filterForm.controls['equipmenttype'].patchValue(filters.equipmenttype);
      this.filterForm.controls['mattertype'].patchValue(filters.mattertype);
      this.filterForm.controls['brand'].patchValue(filters.brand);
      this.filterForm.controls['inventorytype'].patchValue(filters.brand);
      this.filterForm.controls['location'].patchValue(filters.brand);
      this.filterForm.controls['dateRange'].patchValue({
        start: start,
        end: end,
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
    const url = this.router.url.split('?')[0];
    this.router.navigate([url], navigationExtras);
  }
}
