import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/Items';

@Component({
  selector: 'app-faculty-borrowed-item-row',
  templateUrl: './faculty-borrowed-item-row.component.html',
  styleUrls: ['./faculty-borrowed-item-row.component.css']
})
export class FacultyBorrowedItemRowComponent {
  @Input() borrowId: string=''
  @Input() itemborrowed!: Item;

}
