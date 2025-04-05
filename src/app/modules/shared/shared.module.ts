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
import { EquipmentHistoryComponent } from './equipment-history/equipment-history.component';
import { DashboardButtonsMobileComponent } from './dashboard-buttons-mobile/dashboard-buttons-mobile.component';
import { DashboardButtonsComponent } from './dashboard-buttons/dashboard-buttons.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { BorrowHistoryDialogComponent } from './borrow-history-dialog/borrow-history-dialog.component';
import { BorrowStatusMenuComponent } from './borrow-status-menu/borrow-status-menu.component';
import { AccountRequestCategoryComponent } from './account-request-category/account-request-category.component';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { ItemUpdateCustomStepperComponent } from './item-update-custom-stepper/item-update-custom-stepper.component';

@NgModule({
  declarations: [
    DashboardButtonsMobileComponent,
    SnackbarComponent,
    NotificationComponent,
    BorrowItemCategoryComponent,
    EquipmentDetailDialogComponent,
    InventoryCategoryComponent,
    EquipmentHistoryComponent,
    DashboardButtonsComponent,
    NoResultsComponent,
    BorrowHistoryDialogComponent,
    BorrowStatusMenuComponent,
    AccountRequestCategoryComponent,
    CustomStepperComponent,
    ItemUpdateCustomStepperComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    SnackbarComponent,
    NotificationComponent,
    BorrowItemCategoryComponent,
    EquipmentDetailDialogComponent,
    InventoryCategoryComponent,
    DashboardButtonsMobileComponent,
    DashboardButtonsComponent,
    NoResultsComponent,
    BorrowStatusMenuComponent,
    AccountRequestCategoryComponent,
    CustomStepperComponent
  ],
})
export class SharedModule {}
