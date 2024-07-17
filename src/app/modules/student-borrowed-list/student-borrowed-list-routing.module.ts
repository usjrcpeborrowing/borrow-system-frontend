import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentBorrowedListComponent } from './student-borrowed-list/student-borrowed-list.component';
const routes: Routes = [

  {
    path: '',
    component: StudentBorrowedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentBorrowedListRoutingModule { }
