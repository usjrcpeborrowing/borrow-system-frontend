import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { OicBorrowCardPanelComponent } from './oic-borrow-card-panel/oic-borrow-card-panel.component';
import { OicBorrowCardComponent } from './oic-borrow-card/oic-borrow-card.component';
import { OicBorrowCategoryComponent } from './oic-borrow-category/oic-borrow-category.component';
import { OicBorrowedListRoutingModule } from './oic-borrowed-list-routing.module';
import { OicBorrowedListComponent } from './oic-borrowed-list/oic-borrowed-list.component';

import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [
    OicBorrowedListComponent,
    OicBorrowCardComponent,
    OicBorrowCardPanelComponent,
    OicBorrowCategoryComponent
  ],
  imports: [
    CommonModule,
    OicBorrowedListRoutingModule,
    MaterialModule,
    HeaderOicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OicBorrowedListModule { }
