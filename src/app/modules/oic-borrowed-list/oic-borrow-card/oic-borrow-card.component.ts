import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-oic-borrow-card',
  templateUrl: './oic-borrow-card.component.html',
  styleUrls: ['./oic-borrow-card.component.css']
})
export class OicBorrowCardComponent {

  @Input() items: any[] = [];
}
