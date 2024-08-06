import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderOicComponent } from './header-oic/header-oic.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderOicComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderOicComponent],
})
export class HeaderOicModule {}
