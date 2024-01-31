import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';
import { CategoryComponent } from './category/category.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemsComponent } from './items/items.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent,
    ItemsComponent,
    FilterItemsComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule,

    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,

  ]
})
export class InventoryModule {
  
}