import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardInstructorComponent } from './dashboard-instructor/dashboard-instructor.component';
import { DashboardOicComponent } from './dashboard-oic/dashboard-oic.component';
import { DashboardReedsComponent } from './dashboard-reeds/dashboard-reeds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/services/auth.guard';
const routes: Routes = [
  {
    path: 'student',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['student'],
    },
  },
  {
    path: 'reads',
    component: DashboardReedsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['reads'],
    },
  },
  {
    path: 'faculty',
    component: DashboardFacultyComponent,
  },
  {
    path: 'instructor',
    component: DashboardInstructorComponent,
  },
  {
    path: 'oic',
    component: DashboardOicComponent,
  },
  {
    path: 'admin',
    component: DashboardAdminComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
