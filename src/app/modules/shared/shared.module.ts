import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MaterialModule } from '../material.module';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [SnackbarComponent, NotificationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SnackbarComponent, NotificationComponent],
})
export class SharedModule {}
