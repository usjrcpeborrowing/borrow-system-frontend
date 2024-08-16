import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedListComponent } from './borrowed-list/borrowed-list.component';
const routes: Routes = [

  {
    path: '',
    component: BorrowedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowedListRoutingModule { }
