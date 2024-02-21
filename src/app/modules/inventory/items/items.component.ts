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
export class ItemsComponent implements OnInit {
  
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  selectedCategories: any = {};

  constructor(
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
  }

  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
    this.filterItems();
  }

  getItems(): void {
    const searchword = this.searchedWord.value ? this.searchedWord.value : '';
    const equipmentWord = this.selectedCategories.equipmentType ? this.selectedCategories.equipmentType : '';
    this.equipmentService.getItems(this.pagination, searchword, equipmentWord)
      .subscribe(
        (items) => {
          console.log(searchword);
          console.log(equipmentWord);
          this.itemlist = items;
          this.pagination.length = items.length;
        },
        (error) => {
          console.error('Error fetching items:', error);
        }
      );
  }

  searchItem(event: Event): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: this.pagination.page,
        limit: this.pagination.limit,
        opened: this.opened,
        search: this.searchedWord.value,
        equipmentType: this.selectedCategories.equipmentType,
        brand: this.selectedCategories.brand,
        matter: this.selectedCategories.matter,
        description: this.selectedCategories.description,
      },
    };
    this.router.navigate(['/inventory'], navigationExtras);
    
  }

  paginate(event: PageEvent): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        page: event.pageIndex + 1,
        limit: event.pageSize,
        opened: this.opened,
        search: this.searchedWord.value,
        equipmentType: this.selectedCategories.equipmentType,
        brand: this.selectedCategories.brand,
        matter: this.selectedCategories.matter,
        description: this.selectedCategories.description,
      },
    };
    this.router.navigate(['/inventory'], navigationExtras);
  }

  queryParamsHandler(params: Params): void {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    const searchword = params['search'] ? params['search'] : '';
    this.searchedWord.patchValue(searchword);
    this.getItems();

    const selectedCategories = {
      equipmentType: params['equipmentType'] ? params['equipmentType'] : '',
      brand: params['brand'] ? params['brand'] : '',
      matter: params['matter'] ? params['matter'] : '',
      description: params['description'] ? params['description'] : '',
    };

    this.handleSelectedCategories(selectedCategories);
    this.getItems();
  }

  addItem(): void {
    this.dialog.open(AddComponent, {
      height: '80vh',
      width: '40vw',
    });
  }

  filterItems(): void {
    if (this.selectedCategories) {
      this.itemlist = this.itemlist.filter((item: any) => {
        let pass = true;
        Object.keys(this.selectedCategories).forEach((category) => {
          if (this.selectedCategories[category].length > 0) {
            if (!this.selectedCategories[category].includes(item[category])) {
              pass = false;
            }
          }
        });
        return pass;
      });
    }
  }
}
