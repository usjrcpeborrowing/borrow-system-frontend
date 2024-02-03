import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';
import { AddComponent } from '../add/add.component';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})

export class ItemsComponent implements OnInit{
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
  productlist: any = [];
  constructor(
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
  }
  getItems() {
    const searchword = this.searchedWord.value ? this.searchedWord.value : '';
    this.productlist = this.equipmentService.getItems(
      this.pagination,
      searchword
    ).data;
    this.pagination.length = this.equipmentService.getItems(
      this.pagination,
      searchword
    ).data.length;
  }

  searchItem(event: Event) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: this.pagination.page,
        limit: this.pagination.limit,
        opened: this.opened,
        search: this.searchedWord.value,
      },
    };
    this.router.navigate(['/'], navigationExtras);
  }
  paginate(event: PageEvent) {
    console.log(event);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
        opened: this.opened,
        search: this.searchedWord.value,
      },
    };
    this.router.navigate(['/'], navigationExtras);
  }
  queryParamsHandler(params: Params) {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    const searchword = params['search'] ? params['search'] : '';
    this.searchedWord.patchValue(searchword);
    this.getItems();
  }

  addItem() {
    console.log('view');
    this.dialog.open(AddComponent, {
      height: '80vh',
      width: '80vw',
    });
  }
}
