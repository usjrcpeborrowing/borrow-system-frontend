import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BorrowItemCategoryComponent } from './borrow-item-category/borrow-item-category.component';
import { DashboardButtonsComponent } from './dashboard-buttons/dashboard-buttons.component';
import { EquipmentDetailDialogComponent } from './equipment-detail-dialog/equipment-detail-dialog.component';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';
import { NotificationComponent } from './notification/notification.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [DashboardButtonsComponent,SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent, InventoryCategoryComponent, DashboardButtonsComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule,MatTableModule, MatTabsModule

  ],
  exports: [DashboardButtonsComponent, SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent, InventoryCategoryComponent],
})
export class SharedModule {}
