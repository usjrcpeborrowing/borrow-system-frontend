import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Constants } from 'src/app/models/Constant';

@Component({
  selector: 'app-borrowed-item-row-action',
  templateUrl: './borrowed-item-row-action.component.html',
  styleUrls: ['./borrowed-item-row-action.component.css'],
})
export class BorrowedItemRowActionComponent implements OnInit, OnChanges {
  @Input() roles: string[] = [];
  @Input() itemborrowed: any;
  @Output() borrowUpdateEvent = new EventEmitter<any>();
  @Output() onNoOfItemReturnEvent = new EventEmitter<number>();
  @Output() onRemarkUpdateEvent = new EventEmitter<string>();
  @Output() onConditionUpdateEvent = new EventEmitter<string>();

  isReads: boolean = false;
  isOIC: boolean = false;
  isStudent: boolean = false;
  isFaculty: boolean = false;
  isDisplay: boolean = false;
  filteredconditions!: Observable<string[]>;
  conditionControl = new FormControl('');
  conditions: string[] = Constants.equipmentStatus;
  borrowUpdateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.borrowUpdateForm = this.fb.group({
      noItemsReturn: ['1', Validators.pattern(/^\d+$/)],
      condition: ['functional'],
      remarks: [''],
      status: [''],
    });
  }

  get noItemsReturnValue() {
    return this.borrowUpdateForm.get('noItemsReturn')?.value;
  }

  ngOnInit(): void {
    this.filteredconditions = this.conditionControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.conditions))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles']) {
      this.isReads = this.roles.includes('reads');
      this.isOIC = this.roles.includes('oic');
      this.isStudent = this.roles.includes('student');
      this.isFaculty = this.roles.includes('faculty');

      if (this.isOIC) {
        this.isDisplay = ['faculty confirmed', 'pending faculty confirmation'].includes(this.itemborrowed.status);
      }

      if (this.isReads) {
        this.isDisplay = ['oic approved', 'pending return', 'faculty confirmed'].includes(this.itemborrowed.status);
      }

      if (this.isStudent) {
        this.isDisplay = ['released'].includes(this.itemborrowed.status);
      }

      if (this.isFaculty) {
        this.isDisplay = ['pending faculty confirmation'].includes(this.itemborrowed.status);
      }
    }

    if (changes['itemborrowed']) {
      this.borrowUpdateForm.controls['noItemsReturn'].patchValue(this.itemborrowed.quantity);
      this.borrowUpdateForm.controls['condition'].patchValue(this.itemborrowed.condition);
    }
  }

  onItemsReturned() {
    this.onNoOfItemReturnEvent.emit(this.borrowUpdateForm.controls['noItemsReturn'].value);
  }

  onRemarkUpdate() {
    this.onRemarkUpdateEvent.emit(this.borrowUpdateForm.controls['remarks'].value);
  }

  onConditionUpdate() {
    this.onConditionUpdateEvent.emit(this.borrowUpdateForm.controls['condition'].value);
  }

  updateBorrow(status: string) {
    this.borrowUpdateForm.controls['status'].patchValue(status);
    this.borrowUpdateEvent.emit(this.borrowUpdateForm.value);
  }

  private _filter(value: string, options: string[]): string[] {
    const filtervalue = value.toLowerCase();
    return options.filter((option) => option.toLowerCase().includes(filtervalue));
  }
}
