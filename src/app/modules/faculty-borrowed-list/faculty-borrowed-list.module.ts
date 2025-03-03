import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyBorrowedListRoutingModule } from './faculty-borrowed-list-routing.module';
import { FacultyBorrowedListComponent } from './faculty-borrowed-list/faculty-borrowed-list.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { FacultyBorrowCardComponent } from './faculty-borrow-card/faculty-borrow-card.component';
import { FacultyBorrowCardPanelComponent } from './faculty-borrow-card-panel/faculty-borrow-card-panel.component';
import { FacultyBorrowedItemRowComponent } from './faculty-borrowed-item-row/faculty-borrowed-item-row.component';


@NgModule({
  declarations: [
    FacultyBorrowedListComponent,
    FacultyBorrowCardComponent,
    FacultyBorrowCardPanelComponent,
    FacultyBorrowedItemRowComponent
  ],
  imports: [
    CommonModule,
    FacultyBorrowedListRoutingModule,
    HeaderModule,
    SharedModule,
    MaterialModule
  ]
})
export class FacultyBorrowedListModule { }
