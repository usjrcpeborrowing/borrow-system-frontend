import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { HeaderModule } from '../header/header.module';
import { StudentListCardComponent } from './student-list-card/student-list-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentListComponent, StudentListCardComponent],
  imports: [CommonModule, StudentListRoutingModule, SharedModule, MaterialModule, HeaderModule, FormsModule],
})
export class StudentListModule {}
