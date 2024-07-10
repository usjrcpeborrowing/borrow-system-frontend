import { Component } from '@angular/core';

@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css']
})
export class BorrowCardPanelComponent {
  
  items = [
    { name: 'Laptop' },
    { name: 'Book' },
    { name: 'Headphones' }
  ];
}
