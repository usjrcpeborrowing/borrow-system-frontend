import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
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
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 50],
  };
  constructor(private reportDownloadService: ReportDownloadService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.fetchReports();
  }
  isAdmin(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'Admin' : false;
  }
  isReads(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'reads' : false;
  }
  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'reads', 'oic'];
    return allowedRoles.includes(role);
  }

  fetchReports(): void {
    this.equipmentService.getReports(this.pagination).subscribe(
      (data) => {
        const sortedReports = data.sort((a: any, b: any) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        this.downloadRecords = sortedReports.slice(0, 5);
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
}
}