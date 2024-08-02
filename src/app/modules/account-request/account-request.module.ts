import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { MaterialModule } from '../material.module';
import { AccountRequestCardPanelComponent } from './account-request-card-panel/account-request-card-panel.component';
import { AccountRequestCardComponent } from './account-request-card/account-request-card.component';
import { AccountRequestRoutingModule } from './account-request-routing.module';
import { AccountRequestComponent } from './account-request/account-request.component';
@NgModule({
  declarations: [
    AccountRequestComponent,
    AccountRequestCardComponent,
    AccountRequestCardPanelComponent
  ],
  imports: [
    CommonModule,
    AccountRequestRoutingModule,
    HeaderOicModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountRequestModule { }
