import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';

import { CategoryComponent } from './category/category.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

interface Equipment {
  value: string;
  viewValue: string;
}


@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule,

    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ]
})
export class InventoryModule { }

export class EqupimentSelectOverview {
  equipments: Equipment[] = [
    {value: 'equpiment-0', viewValue: 'Equpiment 1'},
  ];
}