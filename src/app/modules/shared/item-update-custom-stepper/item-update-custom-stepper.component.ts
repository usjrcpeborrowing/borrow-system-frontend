import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-update-custom-stepper',
  templateUrl: './item-update-custom-stepper.component.html',
  styleUrls: ['./item-update-custom-stepper.component.css'],
})
export class ItemUpdateCustomStepperComponent {
  @Input() updates: any;
}
