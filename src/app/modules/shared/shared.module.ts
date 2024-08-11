import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaterialModule } from '../material.module';
import { NotificationComponent } from './notification/notification.component';
import { BorrowItemCategoryComponent } from './borrow-item-category/borrow-item-category.component';

@NgModule({
  declarations: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SnackbarComponent, NotificationComponent, BorrowItemCategoryComponent],
})
export class SharedModule {}
