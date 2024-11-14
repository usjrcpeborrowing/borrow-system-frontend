import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list/student-list.component';


@NgModule({
  declarations: [
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentListRoutingModule
  ]
})
export class StudentListModule { }
