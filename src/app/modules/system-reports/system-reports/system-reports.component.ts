import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ReportDownloadService } from 'src/app/services/report-download-service';
@Component({
  selector: 'app-system-reports',
  templateUrl: './system-reports.component.html',
  styleUrls: ['./system-reports.component.css'],
  
})
export class SystemReportsComponent {
  displayedColumns: string[] = ['type', 'department', 'fileName', 'date'];
  downloadRecords: any[] = [];

  constructor(private reportDownloadService: ReportDownloadService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private equipmentService: EquipmentService) { }

  ngOnInit(): void {

    this.reportDownloadService.currentDownloadRecords.subscribe(records => {
      this.downloadRecords = records;
    });
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
}