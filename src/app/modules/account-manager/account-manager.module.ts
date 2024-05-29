import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { AccountManagerRoutingModule } from './account-manager-routing.module';
import { AccountManagerComponent } from './account-manager/account-manager.component';


@NgModule({
  declarations: [
    AccountManagerComponent
  ],
  imports: [
    CommonModule,
    AccountManagerRoutingModule,
    AdminHeaderModule
  ],
  exports: [
    AccountManagerComponent
  ]
})
export class AccountManagerModule { }
