import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AdminHeaderModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
