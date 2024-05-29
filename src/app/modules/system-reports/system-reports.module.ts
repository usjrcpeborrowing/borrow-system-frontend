import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderModule } from '../header/header.module';
import { ReadsHeaderModule } from '../reads-header/reads-header.module';
import { SystemReportsRoutingModule } from './system-reports-routing.module';
import { SystemReportsComponent } from './system-reports/system-reports.component';
@NgModule({
  declarations: [
    SystemReportsComponent
  ],
  imports: [
    CommonModule,
    SystemReportsRoutingModule,
    AdminHeaderModule,
    ReadsHeaderModule,
    HeaderModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    SystemReportsComponent
  ]
})
export class SystemReportsModule { }
