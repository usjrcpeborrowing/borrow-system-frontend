import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentHeaderModule } from '../student-header/student-header.module';
import { StudentBorrowCardPanelComponent } from './student-borrow-card-panel/student-borrow-card-panel.component';
import { StudentBorrowCardComponent } from './student-borrow-card/student-borrow-card.component';
import { StudentBorrowedListRoutingModule } from './student-borrowed-list-routing.module';
import { StudentBorrowedListComponent } from './student-borrowed-list/student-borrowed-list.component';
import { StudentBorrowedItemRowComponent } from './student-borrowed-item-row/student-borrowed-item-row.component';
@NgModule({
  declarations: [
    StudentBorrowedListComponent,
    StudentBorrowCardPanelComponent,
    StudentBorrowCardComponent,
    StudentBorrowedItemRowComponent
  ],
  providers:[DatePipe],
  imports: [
    CommonModule,
    StudentBorrowedListRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    MatFormFieldModule,
    MaterialModule,
    HeaderReadsModule,
    MatSelectModule,
    StudentHeaderModule,
    SharedModule
  ]
})
export class StudentBorrowedListModule { }
