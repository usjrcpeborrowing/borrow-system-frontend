import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderOicComponent } from './header-oic/header-oic.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HeaderOicComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderOicComponent],
})
export class HeaderOicModule {}
