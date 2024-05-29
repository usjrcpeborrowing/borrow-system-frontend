import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderOicModule } from '../header-oic/header-oic.module';
import { HeaderReadsModule } from '../header-reads/header-reads.module';
import { HeaderModule } from '../header/header.module';
import { InventoryLevelsModule } from '../inventory-levels/inventory-levels.module';
import { ReadsHeaderModule } from '../reads-header/reads-header.module';
import { StudentHeaderModule } from '../student-header/student-header.module';
import { SystemReportsModule } from '../system-reports/system-reports.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { BorrowedItemsComponent } from './borrowed-items/borrowed-items.component';
import { ContentTabsComponent } from './content-tabs/content-tabs.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardInstructorComponent } from './dashboard-instructor/dashboard-instructor.component';
import { DashboardOicComponent } from './dashboard-oic/dashboard-oic.component';
import { DashboardReedsComponent } from './dashboard-reeds/dashboard-reeds.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentContentsComponent } from './student-contents/student-contents.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AnnouncementsComponent,
    BorrowedItemsComponent,
    ContentTabsComponent,
    DashboardReedsComponent,
    DashboardFacultyComponent,
    DashboardOicComponent,
    DashboardAdminComponent,
    DashboardInstructorComponent,
    StudentContentsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentHeaderModule,
    ReadsHeaderModule,
    HeaderReadsModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AdminHeaderModule,
    HeaderModule,
    SystemReportsModule,
    InventoryLevelsModule,
    HeaderOicModule,
    InventoryLevelsModule
  ]
})
export class DashboardModule { }
