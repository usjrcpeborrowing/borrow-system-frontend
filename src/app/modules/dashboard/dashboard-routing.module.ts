import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardOicComponent } from './dashboard-oic/dashboard-oic.component';
import { DashboardReedsComponent } from './dashboard-reeds/dashboard-reeds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator'],
    },
  },
  {
    path: 'oic',
    component: DashboardOicComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['oic'],
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
    canActivate: [AuthGuard],
    data: {
      roles: ['faculty'],
    },
  },
  // {
  //   path: 'instructor',
  //   component: DashboardInstructorComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: ['instructor'],
  //   },
  // },

  {
    path: 'student',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['student'],
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
