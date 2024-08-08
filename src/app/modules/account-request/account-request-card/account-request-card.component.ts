import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-request-card',
  templateUrl: './account-request-card.component.html',
  styleUrls: ['./account-request-card.component.css']
})
export class AccountRequestCardComponent {
  
  @Input() users: any[] = [];
}
