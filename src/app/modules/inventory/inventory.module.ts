import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './category/category.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemPanelComponent } from './item-panel/item-panel.component';
import { ItemsComponent } from './items/items.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent,
    ItemsComponent,
    FilterItemsComponent,
    ItemPanelComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule,

    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,

  ]
})
export class InventoryModule {
  
}