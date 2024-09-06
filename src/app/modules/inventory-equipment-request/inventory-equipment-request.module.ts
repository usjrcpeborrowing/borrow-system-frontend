import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { InventoryEquipmentRequestCardPanelComponent } from './inventory-equipment-request-card-panel/inventory-equipment-request-card-panel.component';
import { InventoryEquipmentRequestCardComponent } from './inventory-equipment-request-card/inventory-equipment-request-card.component';
import { InventoryEquipmentRequestRoutingModule } from './inventory-equipment-request-routing.module';
import { InventoryEquipmentRequestComponent } from './inventory-equipment-request/inventory-equipment-request.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    InventoryEquipmentRequestComponent,
    InventoryEquipmentRequestCardComponent,
    InventoryEquipmentRequestCardPanelComponent
  ],
  imports: [
    CommonModule,
    InventoryEquipmentRequestRoutingModule,
    SharedModule,
    HeaderModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    SharedModule
  ]
})
export class InventoryEquipmentRequestModule { }
