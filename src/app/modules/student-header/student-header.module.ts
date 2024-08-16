import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../material.module';
import { StudentHeaderRoutingModule } from './student-header-routing.module';
import { StudentHeaderComponent } from './student-header/student-header.component';

import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentHeaderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule
  ],
  exports:[
    StudentHeaderComponent
  ]
})
export class StudentHeaderModule { }
