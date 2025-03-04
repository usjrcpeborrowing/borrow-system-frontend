import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.css'],
})
export class CustomStepperComponent {
  @Input() histories: any[] = [];
  doer: string = '';

  getDoerName(history: any) {
    return `${history.doer.firstName} ${history.doer.lastName}`;
  }
}
