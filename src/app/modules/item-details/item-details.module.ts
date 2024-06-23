import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ItemDetailsRoutingModule } from './item-details-routing.module';
import { ItemDetailsComponent } from './item-details/item-details.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { HeaderModule } from '../header/header.module';
import { InventoryModule } from '../inventory/inventory.module';
import { MaterialModule } from '../material.module';
import { ReadsHeaderModule } from '../reads-header/reads-header.module';
import { ItemDetailDialogComponent } from './item-detail-dialog/item-detail-dialog.component';
import { InventoryReportProgressComponent } from './inventory-report-progress/inventory-report-progress.component';
@NgModule({
  declarations: [
    ItemDetailsComponent,
    ItemDetailDialogComponent,
    InventoryReportProgressComponent
  ],
  imports: [
    CommonModule,
    ItemDetailsRoutingModule,
    HeaderModule,
    InventoryModule,
    AdminHeaderModule,
    ReadsHeaderModule,
    MatProgressSpinnerModule,
    MatTableModule,
    HeaderReadsModule,
    HeaderOicModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatDialogModule,
    MatSidenavModule,
    MatAutocompleteModule,
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
    MaterialModule
  ]
})
export class ItemDetailsModule { }
