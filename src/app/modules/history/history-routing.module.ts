import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryStudentComponent } from './history-student/history-student.component';

const routes: Routes = [
  {
    path: 'student',
    component: HistoryStudentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
