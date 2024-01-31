import { Component } from '@angular/core';

interface Equipment {
  value: string;
  viewValue: string;
}

interface Brand {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  equipments: Equipment[] = [
    {value: 'equpiment-0', viewValue: 'Equpiment 1'},
  ];

  brands: Brand[] = [
    {value: 'brand-0', viewValue: 'Brand 1'},
  ];
}
