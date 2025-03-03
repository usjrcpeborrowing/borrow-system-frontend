import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faculty-borrow-card',
  templateUrl: './faculty-borrow-card.component.html',
  styleUrls: ['./faculty-borrow-card.component.css'],
})
export class FacultyBorrowCardComponent {
  @Input() borrowedItems: any[] = [];
}
