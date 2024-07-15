import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderReadsRoutingModule } from './header-reads-routing.module';
import { HeaderReadsComponent } from './header-reads/header-reads.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    HeaderReadsComponent
  ],
  imports: [
    CommonModule,
    HeaderReadsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule
  ],
  exports: [
    HeaderReadsComponent
  ]
})
export class HeaderReadsModule { }
