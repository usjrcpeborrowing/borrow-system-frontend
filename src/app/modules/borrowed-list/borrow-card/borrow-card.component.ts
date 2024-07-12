import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-borrow-card',
  templateUrl: './borrow-card.component.html',
  styleUrls: ['./borrow-card.component.css']
})
export class BorrowCardComponent {
  @Input() items: any[] = [];
  

  
  ngOnInit(): void {
  }
}