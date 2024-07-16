import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentBorrowCardPanelComponent } from './student-borrow-card-panel/student-borrow-card-panel.component';
import { StudentBorrowCardComponent } from './student-borrow-card/student-borrow-card.component';
import { StudentBorrowCategoryComponent } from './student-borrow-category/student-borrow-category.component';
import { StudentBorrowedListRoutingModule } from './student-borrowed-list-routing.module';
import { StudentBorrowedListComponent } from './student-borrowed-list/student-borrowed-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [
    StudentBorrowedListComponent,
    StudentBorrowCategoryComponent,
    StudentBorrowCardPanelComponent,
    StudentBorrowCardComponent
  ],
  imports: [
    CommonModule,
    StudentBorrowedListRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MaterialModule,
    HeaderReadsModule,
    MatSelectModule
  ]
})
export class StudentBorrowedListModule { }
