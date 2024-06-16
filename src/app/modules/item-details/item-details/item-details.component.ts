import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { TransactionService } from 'src/app/services/transaction.service';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'serialNo', 'equipmentType', 'brand', 'inventoryType', 'remarks', 'quantity'];
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

  sortUsed: 'asc' | 'desc' = 'asc';
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.isAllowedRole(currentUser.role)) {
      this.router.navigate(['/']);
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
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
  isOic(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'oic' : false;
  }

  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty'];
    return allowedRoles.includes(role);
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
            // console.log('resss', res.data);
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
}
