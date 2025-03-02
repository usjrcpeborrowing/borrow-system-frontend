import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { OicBorrowCardPanelComponent } from './oic-borrow-card-panel/oic-borrow-card-panel.component';
import { OicBorrowCardComponent } from './oic-borrow-card/oic-borrow-card.component';
import { OicBorrowedListRoutingModule } from './oic-borrowed-list-routing.module';
import { OicBorrowedListComponent } from './oic-borrowed-list/oic-borrowed-list.component';

import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { OicBorrowedItemRowComponent } from './oic-borrowed-item-row/oic-borrowed-item-row.component';
@NgModule({
  declarations: [
    OicBorrowedListComponent,
    OicBorrowCardComponent,
    OicBorrowCardPanelComponent,
    OicBorrowedItemRowComponent,
  ],
  imports: [
    CommonModule,
    OicBorrowedListRoutingModule,
    MaterialModule,
    HeaderModule,
    HeaderOicModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class OicBorrowedListModule { }
