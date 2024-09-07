import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BorrowItemCategoryComponent } from './borrow-item-category/borrow-item-category.component';
import { DashboardButtonsComponent } from './dashboard-buttons/dashboard-buttons.component';
import { EquipmentDetailDialogComponent } from './equipment-detail-dialog/equipment-detail-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { HeaderModule } from '../header/header.module';
import { InventoryLevelsModule } from '../inventory-levels/inventory-levels.module';
import { SystemReportsModule } from '../system-reports/system-reports.module';
@NgModule({
  declarations: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent, DashboardButtonsComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule,MatTableModule,
    AdminHeaderModule,
    HeaderOicModule,
    HeaderReadsModule,
    MatTabsModule,
    HeaderModule,
    InventoryLevelsModule,
    SystemReportsModule
  ],
  exports: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent],
})
export class SharedModule {}
