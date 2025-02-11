import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/models/Items';

@Component({
  selector: 'app-student-borrowed-item-row',
  templateUrl: './student-borrowed-item-row.component.html',
  styleUrls: ['./student-borrowed-item-row.component.css'],
})
export class StudentBorrowedItemRowComponent implements OnChanges {
  @Input() item!: Item;
  @Input() history: any[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.item['selected'] = false;
    this.item['selectedQty'] = this.item.quantity;
    this.item['selectedCondition'] = this.item.condition;
    this.item['selectedRemarks'] = this.item.remarks;
    this.item['disabled'] = !['released', 'unreturned'].includes(this.item['status']);

    if (changes['history']) {
      this.getHistoryLabel();
    }
  }

  getHistoryLabel() {
    this.history = this.history.map((x) => {
      let updatedAt = this.datePipe.transform(x.updatedAt, 'mediumDate');
      return { ...x, label: `${x.status} | ${x.doer?.lastName}, ${x.doer?.firstName} ${updatedAt}` };
    });
  }
}
