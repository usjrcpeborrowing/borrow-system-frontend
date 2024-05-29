import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InventoryLevelsRoutingModule } from './inventory-levels-routing.module';
import { InventoryLevelsComponent } from './inventory-levels/inventory-levels.component';


@NgModule({
  declarations: [
    InventoryLevelsComponent
  ],
  imports: [
    CommonModule,
    InventoryLevelsRoutingModule
  ],
  exports: [
    InventoryLevelsComponent
  ]
})
export class InventoryLevelsModule { }
