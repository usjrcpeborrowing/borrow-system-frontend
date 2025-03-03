import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyBorrowedListComponent } from './faculty-borrowed-list/faculty-borrowed-list.component';

const routes: Routes = [ {
    path: '',
    component: FacultyBorrowedListComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyBorrowedListRoutingModule { }
