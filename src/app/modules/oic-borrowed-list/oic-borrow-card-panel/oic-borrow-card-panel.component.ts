import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BorrowedItemsService } from 'src/app/services/borrowed-item.services';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-oic-borrow-card-panel',
  templateUrl: './oic-borrow-card-panel.component.html',
  styleUrls: ['./oic-borrow-card-panel.component.css'],
})
export class OicBorrowCardPanelComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() data: any;

  status_approved: string = 'oic_approved';
  status_faculty_confirmed: string = 'faculty_confirmed';
  status_rejected: string = 'rejected';
  selectAll = false;
  borrower: string = '';
  instructor: string = '';
  defaultImage: string = '../../../../assets/equipment_default_image_thumbnail.png';
  user: User;
  isClassInstructor: boolean = false;
  isDeptOIC: boolean = false;
  checkbox_disabled = false;
  constructor(private cdr: ChangeDetectorRef, private borrowedItemService: BorrowedItemsService, private snackbarService: SnackbarService, private authService: AuthService) {
    this.user = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.items.forEach((item) => {
    //     item.selected = false;
    //     item.selectedQty = item.quantity;
    //     item.selectedCondition = item.condition;
    //     item.selectedRemarks = item.remarks;
    //     item.disabled = 'pending_faculty_confirmation' !== item.status;
    //     // item.disabled = ['approved', 'rejected'].includes(item.status);
    //     // item.disabled = !['pending_approval'].includes(item.status) || (!['faculty_confirmed'].includes(item.status) && this.isDeptOIC());
    //     // if (!['pending_faculty_confirmation'].includes(item.status)) {
    //     //   if (['faculty_confirmed'].includes(item.status) && this.isDeptOIC()) {
    //     //     item.disabled = false;
    //     //   } else {
    //     //     item.disabled = true;
    //     //   }
    //     // }
    //     // // to disable pending_faculty_confirmation from oic
    //     // if (['pending_faculty_confirmation'].includes(item.status) && !this.isClassFaculty()) {
    //     //   item.disabled = true;
    //     // }

    //     //&& this.authService.hasAnyRoles(['faculty'], this.user.role)) || (!['faculty_confirmed'].includes(item.status) && this.authService.hasAnyRoles(['oic'], this.user.role));
    //   });
    //   // this.cdr.detectChanges();
    // }, 0);

    this.borrower = this.data.borrower.firstName + ' ' + this.data.borrower.lastName;
    this.instructor = this.data.instructor.firstName + ' ' + this.data.instructor.lastName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.isClassInstructor = this.data?.instructor._id == this.user._id;
      this.isDeptOIC = this.authService.hasAnyRoles(['oic'], this.user.role) && this.user.department.includes(this.data?.department);
    }

    if (changes['items'] && changes['items']?.currentValue) {
      this.items = [];
      this.items = changes['items']?.currentValue;
    }
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

  updateStatus(status: string) {
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
    this.borrowedItemService.changeBorrowStatus.next({ borrowedItemId: this.data._id, items: selected, status: status });
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
}
