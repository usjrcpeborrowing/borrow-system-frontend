import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-equipment-history',
  templateUrl: './equipment-history.component.html',
  styleUrls: ['./equipment-history.component.css'],
})
export class EquipmentHistoryComponent implements OnChanges {
  constructor(private transactionService: TransactionService) {}

  @Input() transaction!: any;
  revisions: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'].currentValue) {
      this.transaction = changes['transaction'].currentValue;
      this.revisions = this.transactionService.combineRevisions(this.transaction.data);
    }
  }
}
