import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-borrow-request-detail',
  templateUrl: './borrow-request-detail.component.html',
  styleUrls: ['./borrow-request-detail.component.css'],
})
export class BorrowRequestDetailComponent {
  @Input() borrowedItem: any;

}
