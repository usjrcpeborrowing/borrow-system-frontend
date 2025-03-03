import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-faculty-borrow-card-panel',
  templateUrl: './faculty-borrow-card-panel.component.html',
  styleUrls: ['./faculty-borrow-card-panel.component.css'],
})
export class FacultyBorrowCardPanelComponent implements OnInit, OnChanges {
  @Input() borrowedItem: any;

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
