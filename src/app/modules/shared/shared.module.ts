import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BorrowItemCategoryComponent } from './borrow-item-category/borrow-item-category.component';
import { EquipmentDetailDialogComponent } from './equipment-detail-dialog/equipment-detail-dialog.component';
import { NotificationComponent } from './notification/notification.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryCategoryComponent } from './inventory-category/inventory-category.component';

@NgModule({
  declarations: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent, InventoryCategoryComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent, InventoryCategoryComponent],
})
export class SharedModule {}
