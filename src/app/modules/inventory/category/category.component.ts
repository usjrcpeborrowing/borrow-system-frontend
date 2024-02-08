import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';

interface Equipment {
  value: string;
  viewValue: string;
}

interface Brand {
  value: string;
  viewValue: string;
}

interface Matter {
  value: string;
  viewValue: string;
}

interface Description {
  value: string;
  viewValue: string;
}

interface Remarks {
  value: string;
  viewValue: string;
}

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  equipments: Equipment[] = [];
  brands: Brand[] = [];
  matters: Matter[] = [];
  descriptions: Description[] = [];
  remarks: Remarks[] = [];

  @Output() selectedCategories = new EventEmitter<any>();

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadItemsAndCategories();
  }

  loadItemsAndCategories(): void {
    const pagination: Pagination = {
      length: 100,
      page: 1,
      limit: 25,
      pageSizeOption: [5, 10, 25, 100],
    };
    
    this.equipmentService.getItems(pagination, '').subscribe(
      (items) => {
        this.equipments = this.getUniqueValues(items, 'equipmentType');
        this.brands = this.getUniqueValues(items, 'brand');
        this.matters = this.getUniqueValues(items, 'matter');
        this.descriptions = this.getUniqueValues(items, 'description');
        this.remarks = this.getUniqueValues(items, 'remarks');
        
        this.emitSelectedCategories();
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  private getUniqueValues(items: any[], key: string): any[] {
    const uniqueValues: any[] = [];
    items.forEach((item) => {
      if (item[key] && !uniqueValues.some((val) => val.value === item[key])) {
        uniqueValues.push({ value: item[key], viewValue: item[key] });
      }
    });
    return uniqueValues;
  }

  emitSelectedCategories(): void {
    const selectedCategories = {
      equipments: this.equipments.map((e) => e.value),
      brands: this.brands.map((b) => b.value),
      matters: this.matters.map((m) => m.value),
      descriptions: this.descriptions.map((d) => d.value),
      remarks: this.remarks.map((r) => r.value),
    };
    this.selectedCategories.emit(selectedCategories);
  }

  availableColors: ChipColor[] = [
    { name: 'Name (A-Z)', color: undefined },
    { name: 'Name (Z-A)', color: undefined },
    { name: 'Color (A-Z)', color: undefined },
    { name: 'Color (Z-A)', color: undefined },
    { name: 'Status', color: undefined },
    { name: 'Tags', color: undefined },
  ];
}
