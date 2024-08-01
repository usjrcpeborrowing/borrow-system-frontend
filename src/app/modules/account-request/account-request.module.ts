import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRequestRoutingModule } from './account-request-routing.module';
import { AccountRequestComponent } from './account-request/account-request.component';


@NgModule({
  declarations: [
    AccountRequestComponent
  ],
  imports: [
    CommonModule,
    AccountRequestRoutingModule
  ]
})
export class AccountRequestModule { }
