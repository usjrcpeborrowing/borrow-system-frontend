import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { InventoryReportInterface } from 'src/app/models/InventoryReport';
import { Item } from 'src/app/models/Items';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { InventoryReportService } from 'src/app/services/inventory-report.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: Item = {} as Item | any;
  displayedColumns: string[] = ['name', 'serialNo', 'equipmentType', 'brand', 'inventoryType', 'remarks', 'quantity', 'info'];
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [25, 50, 100, 500],
  };
  inventoryFilter: InventoryFilter = {
    equipmenttype: '',
    brand: '',
    mattertype: '',
    inventorytype: '',
    description: '',
    remarks: '',
    department: '',
    name: '',
    dateAcquired: '',
    location: '',
  };

  equipmentlist: any[] = [];
  isloading: boolean = false;
  transactionlist = [];
  inventoryReport: InventoryReportInterface = {
    _id: '',
    schoolYear: '',
    semester: '',
    department: '',
    approval: [],
  };
  currentUserRole: any;
  sortUsed: 'asc' | 'desc' = 'asc';
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private transactionService: TransactionService,
    private inventoryReportService: InventoryReportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const rolesString = localStorage.getItem('roles');
    const rolesArray = rolesString ? JSON.parse(rolesString) : [];
    this.currentUserRole = rolesArray.join(', ');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
      this.getInventoryReport();
    });
  }
  isAdmin(): boolean {
    return this.currentUserRole.includes('administrator');
  }
  isReads(): boolean {
    return this.currentUserRole.includes('reads');
  }
  isOic(): boolean {
    return this.currentUserRole.includes('oic');
  }

  onFilterSelect(event: any) {
    let filter = event.filtername;
    let value = event.value;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        [filter]: value,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/item-details'], navigationExtras);
  }

  getInventoryReport() {
    this.inventoryReportService.getInventoryReport().subscribe((resp: any) => {
      this.inventoryReport = resp.data;
    });
  }

  updateInventoryReport(event: any) {
    this.inventoryReportService.updateInventoryReport(this.inventoryReport._id, event.role, event.status).subscribe({
      next: (resp: any) => {
        this.snackBar.open(resp.message, '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (err: any) => {
        this.snackBar.open(err.message, '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      complete: () => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
    });
  }

  getEquipmentList() {
    this.isloading = true;
    this.equipmentService.getItems(this.pagination, this.inventoryFilter).subscribe((resp) => {
      if (resp.success) {
        this.equipmentlist = resp.data;
        this.pagination.length = resp.total;
        this.sortItemsByName(this.sortUsed);

        const equipmentIds: string[] = this.equipmentlist.map((eqpmnt) => eqpmnt._id);

        this.transactionService.getTransation(equipmentIds).subscribe((res) => {
          if (res.success) {
            console.log('resss', res.data);
            this.transactionlist = res.data;
            this.combineEquipmentAndTransaction();
          }
        });
      }
      this.isloading = false;
    });
  }

  combineEquipmentAndTransaction() {
    this.equipmentlist = this.equipmentlist.map((eqpmnt) => {
      const found: any = this.transactionlist.find((transaction: any) => transaction._id == eqpmnt._id);
      let revision = [];
      if (found) {
        console.log({ revision_data: found.data });
        revision = found.data
          .map((transaction: any) =>
            transaction.revision.map((rev: any) => {
              let { location, transactionType, user, timeStamp } = transaction;
              return {
                ...rev,
                location,
                transactionType,
                user,
                timeStamp,
              };
            })
          )
          .flat(1);
      }
      return { ...eqpmnt, revision };
    });
    console.log(this.equipmentlist);
  }

  queryParamsHandling(params: Params) {
    this.inventoryFilter.equipmenttype = params['equipmenttype'] ? params['equipmenttype'] : '';
    this.inventoryFilter.brand = params['brand'] ? params['brand'] : '';
    this.inventoryFilter.mattertype = params['mattertype'] ? params['mattertype'] : '';
    this.inventoryFilter.inventorytype = params['inventorytype'] ? params['inventorytype'] : '';
    this.inventoryFilter.description = params['description'] ? params['description'] : '';
    this.inventoryFilter.remarks = params['remarks'] ? params['remarks'] : '';
    this.inventoryFilter.department = params['department'] ? params['department'] : '';
    this.inventoryFilter.location = params['location'] ? params['location'] : '';
    this.inventoryFilter.name = params['search'] ? params['search'] : '';
    this.inventoryFilter.dateAcquired = params['dateAcquired'] ? params['dateAcquired'] : '';
    this.sortUsed = params['sort'] ? params['sort'] : 'asc';
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.getEquipmentList();
  }

  sortItemsByName(order: 'asc' | 'desc'): void {
    this.equipmentlist.sort((a: any, b: any) => {
      const nameA = a.name ? a.name.toUpperCase() : '';
      const nameB = b.name ? b.name.toUpperCase() : '';

      if (order === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  isFieldRevised(field: string, revision: any[]): boolean {
    return revision?.filter((rev: any) => rev.field == field).length ? true : false;
  }

  paginate(event: PageEvent) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/item-details'], navigationExtras);
  }

  viewItemDetails(item: any): void {
    this.dialog.open(ItemDetailDialogComponent, {
      height: '90vh',
      width: '47vw',
      data: item,
    });
  }
}
