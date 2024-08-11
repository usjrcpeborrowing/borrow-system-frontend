import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BorrowedListRoutingModule } from './borrowed-list-routing.module';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { MaterialModule } from '../material.module';
import { BorrowCardPanelComponent } from './borrow-card-panel/borrow-card-panel.component';
import { BorrowCardComponent } from './borrow-card/borrow-card.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    BorrowedListComponent,
    BorrowCardComponent,
    BorrowCardPanelComponent
  ],
  imports: [
    CommonModule,
    BorrowedListRoutingModule,
    MaterialModule,
    HeaderReadsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class BorrowedListModule { }
