import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {

    const items = this.equipmentService.getItems({
      length: 100,
      page: 1,
      limit: 25,
      pageSizeOption: [5, 10, 25, 100],
    }, '');

    this.equipments = this.getUniqueValues(items, 'equipmentType');
    this.brands = this.getUniqueValues(items, 'brand');
    this.matters = this.getUniqueValues(items, 'matter');
    this.descriptions = this.getUniqueValues(items, 'description');
    this.remarks = this.getUniqueValues(items, 'remarks');
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
  
  availableColors: ChipColor[] = [
    {name: 'Name (A-Z)', color: undefined},
    {name: 'Name (Z-A)', color: undefined},
    {name: 'Color (A-Z)', color: undefined},
    {name: 'Color (Z-A)', color: undefined},
    {name: 'Status', color: undefined},
    {name: 'Tags', color: undefined},
  ];
}
