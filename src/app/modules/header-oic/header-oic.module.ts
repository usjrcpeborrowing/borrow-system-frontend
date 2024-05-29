import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderOicRoutingModule } from './header-oic-routing.module';
import { HeaderOicComponent } from './header-oic/header-oic.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderOicComponent
  ],
  imports: [
    CommonModule,
    HeaderOicRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  exports: [
    HeaderOicComponent
  ]
})
export class HeaderOicModule { }
