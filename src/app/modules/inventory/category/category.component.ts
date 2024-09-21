import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.services';
import { EquipmentService } from 'src/app/services/equipment.service';
interface Equipment {
  value: string;
  viewValue: string;
  isSelected: boolean;
  subcategories: { value: string; viewValue: string }[];
}

interface Brand {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Matter {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Description {
  value: string;
  viewValue: string;
  isSelected: boolean;
}
interface DateAcquired {
  value: string;
  viewValue: string;
  isSelected: boolean;
}
interface Status {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Remarks {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Department {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

export interface SelectedSort {
  value: string;
  name: string;
  color: ThemePalette;
  isSelected: boolean;
}
interface Item {
  name: string;
}
interface Filters {
  equipmenttype: string;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  @Input() filter!: InventoryFilter;
  equipments: Equipment[] = [];
  brands: string[] = [];
  matters: string[] = [];
  inventorytypes: string[] = [];
  remarks: string[] = [];
  departments: any[] = [];
  locations: string[] = [];
  selectedValue: string[] = [];
  equipmenttypes: string[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;

  selectedBrands: Equipment | null = null;
  selectedMatter: Equipment | null = null;
  selectedInventoryType: Equipment | null = null;
  selectedStatus: Equipment | null = null;
  selectedRemarks: Equipment | null = null;
  selectedDepartment: Equipment | null = null;

  selectedLocation: Equipment | null = null;
  selectedSort: string | null = null;
  selectedDateAcquired: Date | null = null;

  sortSelecteds: SelectedSort[] = [
    { name: 'Name (A-Z)', color: undefined, value: 'asc', isSelected: false },
    { name: 'Name (Z-A)', color: undefined, value: 'desc', isSelected: false },
  ];
  selectedChipOptions: string[] = [];
  // dateRange = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });
  filterForm: FormGroup;
  currentUser: any;
  @Output() selectedCategories: EventEmitter<any> = new EventEmitter();
  constructor(
    private location: Location,
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
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
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadBrandList();
    this.loadEquipmentTypes();
    this.loadMatterList();
    this.getInventoryTypeList();
    this.getItemStatusList();
    this.getDepartmentList();
    this.getLocationList();
    this.filterForm.controls['dateRange'].valueChanges.subscribe((value) => {
      let start = value?.start ? value.start.toISOString().split('T').shift() : '';
      let end = value?.end ? value?.end?.toISOString().split('T').shift() : '';
      const dateRangeString = end ? `${start}|${end}` : start;
      this.navigate('dateAcquired', dateRangeString);
    });
  }

  navigate(param: string, value = undefined) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        [param]: value ? value : this.filterForm.controls[param].value,
      },
      queryParamsHandling: 'merge',
    };

    this.router.navigate(['/inventory'], navigationExtras);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'].currentValue) {
      const filters = changes['filter'].currentValue;
      console.log({ filters });
      const [start, end] = filters.dateAcquired.split('|');
      this.filterForm.controls['equipmenttype'].patchValue(filters.equipmenttype);
      this.filterForm.controls['mattertype'].patchValue(filters.mattertype);
      this.filterForm.controls['brand'].patchValue(filters.brand);
      this.filterForm.controls['inventorytype'].patchValue(filters.brand);
      this.filterForm.controls['location'].patchValue(filters.location);
      this.filterForm.controls['dateRange'].patchValue({
        start: start,
        end: end,
      });
    }
  }

  loadEquipmentTypes(): void {
    this.equipmentService.getEquipmentTypes(this.currentUser.department).subscribe(
      (response) => {
        this.equipmenttypes = response.data;
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }

  loadBrandList(): void {
    this.equipmentService.getBrandList(this.currentUser.department).subscribe({
      next: (resp) => {
        this.brands = resp.data;
      },
    });
  }

  loadMatterList(): void {
    this.equipmentService.getMatterList().subscribe(
      (response) => {
        this.matters = response.data;
        this.selectedDepartment = this.currentUser.department.pop();
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  getInventoryTypeList(): void {
    this.equipmentService.getInventoryTypeList().subscribe(
      (response) => {
        this.inventorytypes = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  getItemStatusList(): void {
    this.equipmentService.getItemStatusList().subscribe(
      (response) => {
        this.remarks = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  getDepartmentList(): void {
    this.equipmentService.getDepartmentList().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  getLocationList(): void {
    this.equipmentService.getLocationList(this.currentUser.department).subscribe(
      (response) => {
        this.locations = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  onSelectChanged(filtername: string, event: MatSelectChange | string) {
    let value: string;
    if (typeof event === 'string') {
      value = event;
    } else {
      value = event.value;
    }

    this.selectedCategories.emit({ filtername, value });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.router.navigate(['/inventory']);
  }

  // handleQueryParams(params: Params): void {

  //   this.equipments.forEach((equipment) => {
  //     equipment.isSelected = params['equipmentType'] === equipment.value;
  //     console.log(equipment.isSelected);
  //   });

  //   this.brands.forEach((brand) => {
  //     brand.isSelected = params['brand'] === brand.value;
  //   });

  //   this.matters.forEach((matter) => {
  //     matter.isSelected = params['matter'] === matter.value;
  //   });

  //   this.descriptions.forEach((description) => {
  //     description.isSelected = params['description'] === description.value;
  //   });
  //   this.dateAcquired.forEach((dateAcquired) => {
  //     dateAcquired.isSelected = params['dateAcquired'] === dateAcquired.value;
  //   });
  //   this.status.forEach((status) => {
  //     status.isSelected = params['status'] === status.value;
  //   });

  //   this.remarks.forEach((remark) => {
  //     remark.isSelected = params['remarks'] === remark.value;
  //   });

  //   this.departments.forEach((department) => {
  //     department.isSelected = params['department'] === department.value;
  //   });
  //   this.sortSelecteds.forEach((sortSelected) => {
  //     sortSelected.isSelected = params['sort'] === sortSelected.value;
  //   });

  //   this.emitSelectedCategories();
  // }

  // updateQueryParams(category: string, value: string): void {
  //   const queryParams: Params = {};
  //   queryParams[category] = value;

  //   this.router.navigate([], {
  //     relativeTo: this.activatedRoute,
  //     queryParams,
  //     queryParamsHandling: 'merge',
  //   });
  // }

  // emitSelectedCategories(): void {
  //   const selectedCategories = {
  //     equipments: this.equipments.map((e) => e.value),
  //     brands: this.brands.map((b) => b.value),
  //     matters: this.matters.map((m) => m.value),
  //     descriptions: this.descriptions.map((d) => d.value),
  //     dateAcquired: this.dateAcquired.map((d) => d.value),
  //     status: this.status.map((r) => r.value),
  //     remarks: this.remarks.map((r) => r.value),
  //     departments: this.departments.map((d) => d.value),
  //     sortSelecteds: this.sortSelecteds.map((s) => s.value)
  //   };
  //   this.selectedCategories.emit(selectedCategories);
  // }
}
