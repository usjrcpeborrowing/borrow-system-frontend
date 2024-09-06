import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryEquipmentRequestComponent } from './inventory-equipment-request/inventory-equipment-request.component';
const routes: Routes = [{
  path: '',
  component: InventoryEquipmentRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryEquipmentRequestRoutingModule { }
