import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { AccountRequestCardPanelComponent } from './account-request-card-panel/account-request-card-panel.component';
import { AccountRequestCardComponent } from './account-request-card/account-request-card.component';
import { AccountRequestRoutingModule } from './account-request-routing.module';
import { AccountRequestComponent } from './account-request/account-request.component';
import { SharedModule } from '../shared/shared.module';
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
    ReactiveFormsModule,
    HeaderModule,
    SharedModule
  ]
})
export class AccountRequestModule { }
