import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentsRoutingModule } from './manage-students-routing.module';
import { ManageStudentsComponent } from './manage-students/manage-students.component';


@NgModule({
  declarations: [
    ManageStudentsComponent
  ],
  imports: [
    CommonModule,
    ManageStudentsRoutingModule
  ]
})
export class ManageStudentsModule { }
