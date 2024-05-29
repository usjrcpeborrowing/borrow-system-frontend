import { Component, ViewEncapsulation } from '@angular/core';

import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
@Component({
  selector: 'app-student-contents',
  templateUrl: './student-contents.component.html',
  styleUrls: ['./student-contents.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentContentsComponent {
  borrowedItems: any[] = [];
  displayedColumns: string[] = ['name', 'equipmentType', 'brand', 'quantity'];
  constructor(private borrowedItemsService: BorrowedItemsService) { }

  ngOnInit() {
  this.borrowedItemsService.currentBorrowedItems.subscribe(items => {
      this.borrowedItems = items;
  });
  }
}
