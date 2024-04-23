import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
export class CategoryComponent implements OnInit {
  
  equipments: Equipment[] = [];
  brands: string[] = [];
  matters: string[] = [];
  inventorytypes: string[] = [];
  remarks: string[] = [];
  departments: any[] = [];
  locations: string[] = [];
  selectedValue: string[] = [];
  equipmenttypes: string[] = [];
  selectedEquipment: Equipment | null = null;
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
    { name: 'Name (A-Z)', color: undefined , value: 'asc', isSelected: false},
    { name: 'Name (Z-A)', color: undefined , value: 'desc', isSelected: false},
  ];
  selectedChipOptions: string[] = [];
  
  filterForm: FormGroup;
  @Output() selectedCategories: EventEmitter<any> = new EventEmitter();
  constructor(
    private location: Location ,
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private fb: FormBuilder
    ) {
      this.filterForm = this.fb.group({
      equipmenttype: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadEquipmentTypes();
    this.loadBrandList();
    this.loadMatterList();
    this.getInventoryTypeList();
    this.getItemStatusList();
    this.getDepartmentList();
    
    this.getLocationList();
  }
  
  loadEquipmentTypes(): void {
    this.equipmentService.getEquipmentTypes().subscribe(
      (response) => {
        this.equipmenttypes = response.data;
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }

  loadBrandList(): void {
    this.equipmentService.getBrandList().subscribe(
      (response) => {
        this.brands = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  loadMatterList(): void {
    this.equipmentService.getMatterList().subscribe(
      (response) => {
        this.matters = response.data;
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
    this.departmentService.getDepartmentList().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  getLocationList(): void {
    this.equipmentService.getLocationList().subscribe(
      (response) => {
        this.locations = response.data;
        console.log(this.locations)
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
  onDateChange(event: MatDatepickerInputEvent<Date>, type: 'startDate' | 'endDate'): void {
    const date = event.value;
    if (type === 'startDate') {
      this.startDate = date;
      const start = this.startDate?.toISOString().split('T')[0];
      console.log(start)
      
      this.selectedCategories.emit({ filtername: 'dateAcquired', value: start });
    } else if (type === 'endDate') {
      this.endDate = date;
      const end = this.endDate?.toISOString().split('T')[0];
      console.log(end)
      
      this.selectedCategories.emit({ filtername: 'enddate', value: end });
    }
}

onDateRangeChanged(dateRange: DateRange<Date>): void {
  if (dateRange.start && dateRange.end) {
      const startDate = dateRange.start.toISOString().split('T')[0];
      const endDate = dateRange.end.toISOString().split('T')[0];
      this.selectedCategories.emit({ filtername: 'dateacquired', value: startDate });
      this.selectedCategories.emit({ filtername: 'enddate', value: endDate });
  }
}
  
  
  resetFilters(): void {
    console.log('Resetting filters...');
    this.selectedEquipment = null;
    this.selectedBrands = null;
    this.selectedMatter = null;
    this.selectedInventoryType = null;
    this.selectedRemarks = null;
    this.selectedDepartment = null;
    this.selectedDateAcquired = null;
    this.selectedSort = null;
    this.selectedLocation = null;
      const queryParams: Params = {};
      queryParams['equipmenttype'] = '';
      queryParams['brand'] = '';
      queryParams['mattertype'] = '';
      queryParams['description'] = '';
      queryParams['remarks'] = '';
      queryParams['department'] = '';
      queryParams['dateAcquired'] = '';
      queryParams['status'] = '';
      queryParams['sort'] = '';
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
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
