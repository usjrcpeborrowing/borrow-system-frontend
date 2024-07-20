import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { HeaderReadsRoutingModule } from './header-reads-routing.module';
import { HeaderReadsComponent } from './header-reads/header-reads.component';
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
    SharedModule,
    MatSidenavModule
  ],
  exports: [
    HeaderReadsComponent
  ]
})
export class HeaderReadsModule { }
