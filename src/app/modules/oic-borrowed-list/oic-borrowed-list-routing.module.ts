import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OicBorrowedListComponent } from './oic-borrowed-list/oic-borrowed-list.component';
const routes: Routes = [
  {
    path: '',
    component: OicBorrowedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OicBorrowedListRoutingModule { }
