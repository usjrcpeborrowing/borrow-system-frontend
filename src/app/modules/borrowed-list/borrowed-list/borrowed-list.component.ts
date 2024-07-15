import { Component, Input, OnInit } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
@Component({
  selector: 'app-borrowed-list',
  templateUrl: './borrowed-list.component.html',
  styleUrls: ['./borrowed-list.component.css']
})
export class BorrowedListComponent implements OnInit {
  
  @Input() items: any[] = [];
  borrowedItems: any[] = [];
  
  openedCategory: boolean = false;
  constructor(private borrowListService: BorrowedItemsService) { }
  
  ngOnInit(): void {
    this.fetchBorrowedItems();
  }

  fetchBorrowedItems(): void {
  
    this.borrowListService.getBorrowedList()
      .subscribe(data => {
        this.borrowedItems = data;
        console.log(data);
      }, error => {
        console.error('Failed to load borrowed items:', error);
      });
  }
  
  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }
}
