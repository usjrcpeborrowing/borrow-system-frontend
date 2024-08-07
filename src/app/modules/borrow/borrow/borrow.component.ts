import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { InventoryFilter } from 'src/app/models/InventoryFilter';
import { Item } from 'src/app/models/Items';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  
  addedEquipment: Item[] = [];
  isFetching: boolean = false;
  noItems: boolean = false;

  greetings: string = 'CPE';
  equipmentlist: any[] = [];
  openedCart: boolean = false;

  openedCategory: boolean = false;

  selectedCategories: any = {};
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  wordSearched: any = '';
  sortUsed: 'asc' | 'desc' = 'asc';
  dateSelected = new FormControl('');

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
  };
  currentUserRole: any;
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, 
    private changeDetector: ChangeDetectorRef,private borrowedItemsService: BorrowedItemsService) {}

  ngOnInit(): void {
    const rolesString = localStorage.getItem('roles');
    const rolesArray = rolesString ? JSON.parse(rolesString) : [];
    this.currentUserRole = rolesArray.join(', ');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParamsHandling(params);
      console.log('QUEUE LOOK: ', this.equipmentlist)
    });
  }

  addToCart(item: Item) {
    this.addedEquipment.push(item);
  }
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'faculty' : false;
  }
  searchProduct(event: any) {
    console.log(event);
  }

  cartClicked() {
    this.openedCart = !this.openedCart;
  }
  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }
  
  toggleItemInCart(item: Item) {
    const index = this.addedEquipment.findIndex(e => e._id === item._id);
    if (index !== -1) {
      this.addedEquipment.splice(index, 1);
    } else {
      const newItem = { ...item, quantity: 1 };
      this.addedEquipment.push(newItem);
    }
  }
  
  addItemToAddedEquipment(item: Item) {
    const existingItemIndex = this.addedEquipment.findIndex(e => e._id === item._id);
  
    if (existingItemIndex !== -1) {
      return
    } else {
      this.addedEquipment.push(item);
    }
  }

  removeItemFromAddedEquipment(item: Item) {
    const index = this.addedEquipment.findIndex(e => e._id === item._id);
    if (index !== -1) {
      this.addedEquipment.splice(index, 1);
    }
  }
  
  updateItemQuantityInAddedEquipment({ item, quantity }: { item: Item; quantity: number }) {
    const index = this.addedEquipment.indexOf(item);
    if (index > -1) {
      this.addedEquipment[index].quantity = quantity;
    }
  }
  

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  filterItemsBySearchWord(items: any[], searchWord: string, dateSelected: string): any[] {
  console.log("SEARCH WORD", dateSelected);

    let filteredItems = items.filter(item => {
      const searchFields = ['name'];
      return searchFields.some(field => {
        return item[field] && item[field].toLowerCase().includes(searchWord.toLowerCase());
      });
    });
  
    if (dateSelected) {
      const dateFields = ['dateAcquired'];
      filteredItems = filteredItems.filter(item => {
        return dateFields.some(field => {
          return item[field] && item[field].toLowerCase().includes(dateSelected.toLowerCase());
        });
      });
    }
    
  return filteredItems;
  }

  // getEquipmentList() {
  //   let filter: Filter = {
  //     searchWord: this.searchedWord,
  //   };
  //   this.equipmentService.getItems(this.pagination, filter).subscribe((resp) => {
  //     this.equipmentlist = resp.data;
  //   });
  // }
  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.getEquipmentList();
  }
  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
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
    console.log(this.inventoryFilter);
    this.getEquipmentList();
  }
  getEquipmentList() {
    this.isFetching = true;
    this.equipmentService.getItems(this.pagination, this.inventoryFilter).subscribe((resp) => {
      this.isFetching = false;
      this.equipmentlist = resp.data;
      console.log(this.equipmentlist)
      this.pagination.length = resp.total;
      this.sortItemsByName(this.sortUsed);
    });
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
  onFilterSelect(event: any) {
    let filter = event.filtername;
    let value = event.value;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        [filter]: value,
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/borrow'], navigationExtras);
  }
  borrowItems() {
    this.addedEquipment.forEach(item => {
      this.borrowedItemsService.addBorrowedItem(item);
    });
    this.addedEquipment = [];
  }
  searchItem(event: Event): void {
    const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
    console.log(searchWord);
    const currentQueryParams = this.activatedRoute.snapshot.queryParams;
    const newQueryParams = {
      ...currentQueryParams,
      page: 1,
      search: searchWord,
    };
    this.router.navigate(['/borrow'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge',
    });
  }

}
