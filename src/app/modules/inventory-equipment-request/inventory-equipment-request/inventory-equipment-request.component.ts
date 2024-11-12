import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { BorrowedItemFilter } from 'src/app/models/BorrowedItemFilter';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { Item } from 'src/app/models/Items';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { EquipmentService } from 'src/app/services/equipment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-inventory-equipment-request',
  templateUrl: './inventory-equipment-request.component.html',
  styleUrls: ['./inventory-equipment-request.component.css'],
})
export class InventoryEquipmentRequestComponent implements OnInit {
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 50],
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
    categories: '',
    recentlyBorrowed: ''
  };

  currentUser: any;
  equipments: Item[] = [];
  openedCategory: boolean = false;
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private snackbarService: SnackbarService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
    this.equipmentService.onConfirmEquipment().subscribe((resp) => {
      console.log(resp);
      this.equipmentService.confirmEquipment(resp._id, { ...resp, confirmed: true }).subscribe({
        next: (resp) => this.snackbarService.openSnackBar(resp.message, 'OK'),
        error: (err) => this.snackbarService.openSnackBar(err.message, 'OK', true),
        complete: () => this.getUnconfirmedEquipments(),
      });
    });

    this.equipmentService.onConfirmSelectedEquipments().subscribe({
      next: (resp) => {
        if (resp.equipmentIds.length) {
          this.equipmentService.confirmEquipmentByIds(resp).subscribe({
            next: (resp) => this.snackbarService.openSnackBar(resp.message, 'OK'),
            error: (err) => this.snackbarService.openSnackBar(err.message, 'OK', true),
            complete: () => {
              console.log('complete');
              this.getUnconfirmedEquipments();
            },
          });
        }
      },
    });
  }

  paginate(event: PageEvent) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['/inventory-equipment-request'], navigationExtras);
  }

  getUnconfirmedEquipments(): void {
    this.equipmentService.getUnconfirmedEquipments(this.inventoryFilter, this.pagination, this.currentUser.department).subscribe({
      next: (resp) => {
        console.log('haha  resp', resp);
        this.equipments = resp.data;
        this.pagination.length = resp.total as number;
      },
    });
  }

  queryParamsHandling(params: Params) {
    this.inventoryFilter.equipmenttype = params['equipmenttype'] ? params['equipmenttype'] : '';
    this.inventoryFilter.categories = params['categories'] ? params['categories'] : '';
    this.inventoryFilter.brand = params['brand'] ? params['brand'] : '';
    this.inventoryFilter.mattertype = params['mattertype'] ? params['mattertype'] : '';
    this.inventoryFilter.department = params['department'] ? params['department'] : this.currentUser.department[0];
    this.inventoryFilter.location = params['location'] ? params['location'] : '';
    this.inventoryFilter.name = params['search'] ? params['search'] : '';
    this.inventoryFilter.dateAcquired = params['dateAcquired'] ? params['dateAcquired'] : '';
    this.inventoryFilter.recentlyBorrowed = params['recentlyBorrowed'] ? params['recentlyBorrowed'] : '';
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.getUnconfirmedEquipments();
  }
}
