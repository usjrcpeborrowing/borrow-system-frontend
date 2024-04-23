import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
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
    remarks: '',
    deparment: '',
    name: '',
    dateAcquired: '',
    location: '',
  };
  equipmentlist: any[] = [];
  sortUsed: 'asc' | 'desc' = 'asc';
  
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private equipmentService: EquipmentService) { }

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
  
  onFilterSelect(event: any) {
    let filter = event.filtername;
    let value = event.value;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        [filter]: value,
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/inventory'], navigationExtras);
  }
  
  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty'];
    return allowedRoles.includes(role);
  }
  getEquipmentList() {
    this.equipmentService.getItems(this.pagination, this.inventoryFilter).subscribe((resp) => {
      this.equipmentlist = resp.data;
      this.pagination.length = resp.total;
      this.sortItemsByName(this.sortUsed);
    });
  }

  queryParamsHandling(params: Params) {
    this.inventoryFilter.equipmenttype = params['equipmenttype'] ? params['equipmenttype'] : '';
    this.inventoryFilter.brand = params['brand'] ? params['brand'] : '';
    this.inventoryFilter.mattertype = params['mattertype'] ? params['mattertype'] : '';
    this.inventoryFilter.inventorytype = params['inventorytype'] ? params['inventorytype'] : '';
    this.inventoryFilter.remarks = params['remarks'] ? params['remarks'] : '';
    this.inventoryFilter.deparment = params['deparment'] ? params['deparment'] : '';
    this.inventoryFilter.location = params['location'] ? params['location'] : '';
    this.inventoryFilter.name = params['search'] ? params['search'] : '';
    this.inventoryFilter.dateAcquired = params['dateAcquired'] ? params['dateAcquired'] : '';
    this.sortUsed = params['sort'] ? params['sort'] : 'asc';
    console.log(this.inventoryFilter);
    this.getEquipmentList();
  }
  onPageChange(pagination: Pagination): void {
    this.pagination = pagination;
    this.getEquipmentList();
  }
  getSort(sortOrder: 'asc' | 'desc' = 'asc'): void {
    this.sortUsed = sortOrder;
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
}
