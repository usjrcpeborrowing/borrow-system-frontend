import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';

import { CategoryComponent } from './category/category.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule
  ]
})
export class InventoryModule { }
