import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryAdminComponent } from './history-admin/history-admin.component';
import { HistoryFacultyComponent } from './history-faculty/history-faculty.component';
import { HistoryOicComponent } from './history-oic/history-oic.component';
import { HistoryReedsComponent } from './history-reeds/history-reeds.component';
import { HistoryStudentComponent } from './history-student/history-student.component';

const routes: Routes = [
  {
    path: 'student',
    component: HistoryStudentComponent
  },
  {
    path: 'reads',
    component: HistoryReedsComponent
  },
  {
    path: 'admin',
    component: HistoryAdminComponent
  },
  {
    path: 'oic',
    component: HistoryOicComponent
  },
  {
    path: 'faculty',
    component: HistoryFacultyComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
