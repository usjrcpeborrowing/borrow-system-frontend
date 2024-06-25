import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { Report } from 'src/app/models/Reports';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ReportDownloadService } from 'src/app/services/report-download-service';
@Component({
  selector: 'app-system-reports',
  templateUrl: './system-reports.component.html',
  styleUrls: ['./system-reports.component.css'],
  
})
export class SystemReportsComponent {
  displayedColumns: string[] = ['user', 'location', 'department', 'fileName', 'date'];
  downloadRecords: any[] = [];
  accountDepartment: any = '';
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 50],
  };
  constructor(private reportDownloadService: ReportDownloadService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.accountDepartment = currentUser?.department;
    this.fetchReports();
  }
  isAdmin(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser? currentUser.role.includes('administrator') : false;
  }
  isReads(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser? currentUser.role.includes('reads') : false;
  }

  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'reads', 'oic'];
    return allowedRoles.includes(role);
  }

  fetchReports(): void {
    
    const currentUser = this.authService.getCurrentUser();
    // this.equipmentService.getReports(this.pagination).subscribe(
    //   (data) => {
    //     const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
    //     this.downloadRecords = sortedReports.slice(0, 5);
    //   },
    //   (error) => {
    //     console.error('Error fetching reports:', error);
    //   }
    // );
    if (this.isAdmin()) {
      this.equipmentService.getReports(this.pagination).subscribe(
        (data) => {
          const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
          this.downloadRecords = sortedReports.slice(0, 5);
        },
        (error) => {
          console.error('Error fetching reports:', error);
        }
      );
    } else {
      this.equipmentService.getReports(this.pagination).subscribe(
        (data) => {
          const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
          const userDepartment = this.accountDepartment;
          this.downloadRecords = sortedReports.filter((report: Report) => report.department === userDepartment).slice(0, 5);
        },
        (error) => {
          console.error('Error fetching reports:', error);
        }
      );
    }

  }
}