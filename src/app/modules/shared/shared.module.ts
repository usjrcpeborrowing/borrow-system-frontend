import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaterialModule } from '../material.module';
import { NotificationComponent } from './notification/notification.component';
import { BorrowItemCategoryComponent } from './borrow-item-category/borrow-item-category.component';
import { RouterModule } from '@angular/router';
import { EquipmentDetailDialogComponent } from './equipment-detail-dialog/equipment-detail-dialog.component';

@NgModule({
  declarations: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent, EquipmentDetailDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent],
})
export class SharedModule {}
