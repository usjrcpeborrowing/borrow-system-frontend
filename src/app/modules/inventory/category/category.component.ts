import { Component } from '@angular/core';

import { ThemePalette } from '@angular/material/core';
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
export class CategoryComponent {
  equipments: Equipment[] = [
    {value: 'equpiment-0', viewValue: 'Equpiment 1'},
  ];

  brands: Brand[] = [
    {value: 'brand-0', viewValue: 'Brand 1'},
  ];

  matters: Matter[] = [
    {value: 'matter-0', viewValue: 'Solid'},
    {value: 'matter-1', viewValue: 'Liquid'},
    {value: 'matter-2', viewValue: 'Gas'},
  ];

  descriptions: Description[] = [
    {value: 'description-0', viewValue: 'Non-Inventory'},
    {value: 'description-1', viewValue: 'Consumables'},
  ];
  remarks: Remarks[] = [
    {value: 'remarks-0', viewValue: 'Functional'},
    {value: 'remarks-1', viewValue: 'Defective'},
    {value: 'remarks-2', viewValue: 'Turnover'},
    {value: 'remarks-3', viewValue: 'Lost'},
  ];

  availableColors: ChipColor[] = [
    {name: 'Name (A-Z)', color: undefined},
    {name: 'Name (Z-A)', color: undefined},
    {name: 'Color (A-Z)', color: undefined},
    {name: 'Color (Z-A)', color: undefined},
    {name: 'Status', color: undefined},
    {name: 'Tags', color: undefined},
  ];
}
