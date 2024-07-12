import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css']
})
export class BorrowCardPanelComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() user: any;
  constructor() {}

  ngOnInit(): void {
  }
}