import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './category/category.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { ReadsHeaderModule } from '../reads-header/reads-header.module';
@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent,
    ItemsComponent,
    FilterItemsComponent,
    ItemPanelComponent,
    AddComponent,
    ItemDialogComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule,
    AdminHeaderModule,
    ReadsHeaderModule,
    MatProgressSpinnerModule,
    MatTableModule,
    HeaderReadsModule,
    HeaderOicModule,
    MatSortModule,
    MatPaginatorModule,
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
  ],
  exports:[
    CategoryComponent,
  ]
  
})
export class InventoryModule {
  
}