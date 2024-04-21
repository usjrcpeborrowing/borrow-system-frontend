import { Component, ViewEncapsulation } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';

@Component({
  selector: 'app-content-tabs',
  templateUrl: './content-tabs.component.html',
  styleUrls: ['./content-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentTabsComponent {
  
  borrowedItems: any[] = [];
  constructor(private borrowedItemsService: BorrowedItemsService) { }

  ngOnInit() {
  this.borrowedItemsService.currentBorrowedItems.subscribe(items => {
      this.borrowedItems = items;
  });
  }
}
