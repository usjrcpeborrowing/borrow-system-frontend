import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-content-tabs',
  templateUrl: './content-tabs.component.html',
  styleUrls: ['./content-tabs.component.css'],
})
export class ContentTabsComponent implements OnInit {
  isFetching: boolean = false;
  
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  noItems: boolean = false;
  itemlist: any[] = [];
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
    recentlyBorrowed: '',
    condition: ''
  };

  constructor(
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
    });
  }

  queryParamsHandling(params: Params) {
    this.inventoryFilter.name = params['search'] ? params['search'] : '';
    this.pagination.page = params['page'] ? +params['page'] : 1;
    this.getItems();
  }

  getItems() {
    this.isFetching = true;
    this.equipmentService.getAvailableEquipment(this.pagination, this.inventoryFilter).subscribe({
      next: (resp) => {
        this.isFetching = false;
        this.itemlist = resp.data;
        this.pagination.length = resp.total;
        this.noItems = this.itemlist.length === 0;
        
        const midsizeurl = resp.data?.images?.midSizeUrl?.length ? resp.data?.images?.midSizeUrl : '';
        const id: string = midsizeurl.substring(midsizeurl.lastIndexOf('/d/') + 3, midsizeurl.lastIndexOf('/view'));
        this.displayImage = `https://drive.google.com/thumbnail?id=${id}&&sz=w1000`;
        
        console.log(this.itemlist);
      },
      error: (err) => {
        this.isFetching = false;
        this.noItems = true;
        console.error('Error fetching items:', err);
      },
    });
  }

  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.getItems();
  }
}
