import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Constants } from 'src/app/models/Constant';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-borrow-card-panel',
  templateUrl: './borrow-card-panel.component.html',
  styleUrls: ['./borrow-card-panel.component.css'],
})
export class BorrowCardPanelComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() data: any;

  equipmentStatus = Constants.equipmentStatus;
  selectedStatus = '';
  status_released: string = 'released';
  status_return: string = 'returned';
  selectAll = false;
  remarks: string = 'haha';
  borrower: string = '';
  instructor: string = '';
  statusControl = new FormControl<string>('');
  conditions: string[] = Constants.equipmentStatus;
  filteredconditions!: Observable<string[]>;
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';

  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items.forEach((item) => {
        item.selected = false;
        item.selectedQty = item.quantity;
        item.selectedCondition = item.condition;
        item.selectedRemarks = item.remarks;
        item.disabled = !['oic_approved', 'pending_return', 'unreturned'].includes(item.status);
      });
      this.cdr.detectChanges();
    }, 0);

    this.borrower = this.data.borrower.firstName + ' ' + this.data.borrower.lastName;
    this.instructor = this.data.instructor.firstName + ' ' + this.data.instructor.lastName;

    this.filteredconditions = this.statusControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.conditions))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onFilterCondition(event: Event) {
    this.statusControl.patchValue((event.target as HTMLInputElement).value);
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  toggleSelectAll(event: any): void {
    this.selectAll = event.checked;
    this.items.forEach((item) => {
      if (!item.disabled) item.selected = this.selectAll;
    });
    this.cdr.detectChanges();
  }

  onItemChange(item: any): void {
    if (!item.selected) {
      this.selectAll = false;
    } else {
      this.selectAll = this.items.every((i) => i.selected);
    }
    this.cdr.detectChanges();
  }

  onItemStatusChange(index: any) {
    console.log(index);
  }

  releaseItems(status: string) {
    let exceed = this.items.some((item) => item.selectedQty > item.quantity);
    if (exceed) {
      this.snackbarService.openSnackBar('Updated items exceeds on approved Qty', 'OK');
      return;
    }

    const partiallyReturned = this.items
      .filter((item) => item.quantity !== item.selectedQty)
      .map((x) => ({
        _id: null,
        equipment: x.equipment._id,
        quantity: x.selectedQty,
        condition: x.selectedCondition,
        prevCondition: x.condition,
        status: x.selected ? status : x.status,
        remarks: x.selectedRemarks,
      }));
    console.log({ partiallyReturned });
    let selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        _id: x._id,
        equipment: x.equipment._id,
        quantity: x.quantity !== x.selectedQty ? x.quantity - x.selectedQty : x.quantity,
        condition: x.quantity !== x.selectedQty ? x.condition : x.selectedCondition,
        prevCondition: x.condition,
        status: x.quantity !== x.selectedQty ? x.status : status,
        remarks: x.quantity !== x.selectedQty ? x.remarks : x.selectedRemarks,
      }));
    selected = selected.concat(partiallyReturned);
    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
      return;
    }

    this.borrowedItemService.changeBorrowStatus.next({
      borrowedItemId: this.data._id,
      items: selected,
      status: this.status_return,
    });
  }

  returnItems(status: string) {
    const partiallyReturned = this.items
      .filter((item) => item.quantity !== item.selectedQty)
      .map((x) => ({
        _id: null,
        equipment: x.equipment._id,
        quantity: x.selectedQty,
        condition: x.selectedCondition,
        prevCondition: x.condition,
        status: x.selected ? status : x.status,
        remarks: x.selectedRemarks,
      }));
    console.log({ partiallyReturned });
    let selected = this.items
      .filter((item) => item.selected)
      .map((x) => ({
        _id: x._id,
        equipment: x.equipment._id,
        quantity: x.quantity !== x.selectedQty ? x.quantity - x.selectedQty : x.quantity,
        condition: x.quantity !== x.selectedQty ? x.condition : x.selectedCondition,
        prevCondition: x.condition,
        status: x.quantity !== x.selectedQty ? x.status : status,
        remarks: x.quantity !== x.selectedQty ? x.remarks : x.selectedRemarks,
      }));
    selected = selected.concat(partiallyReturned);
    console.log({ selected });
    if (!selected.length) {
      this.snackbarService.openSnackBar('No items selected', 'OK');
      return;
    }

    this.borrowedItemService.changeBorrowStatus.next({
      borrowedItemId: this.data._id,
      items: selected,
      status: this.status_return,
    });
  }

  formatStatus(status: string): string {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  actionDisabled() {
    return this.items.filter((item) => item.selected).length == 0;
  }

  releaseBtnDisabled() {
    return this.items.filter((item) => item.selected && ['oic_approved'].includes(item.status)).length == 0;
  }

  returnBtnDisabled() {
    return this.items.filter((item) => item.selected && ['pending_return', 'unreturned'].includes(item.status)).length == 0;
  }
}
