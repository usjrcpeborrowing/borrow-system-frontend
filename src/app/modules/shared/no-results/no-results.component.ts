import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.css']
})
export class NoResultsComponent {
  url: string;

  @Input() message: string = 'No Results \n ૮(˶ㅠ︿ㅠ)ა';
  @Input() isDisplay: boolean = false;

  constructor(private router: Router) {
    this.url = this.router.url.split('?')[0];
  }

  navigate() {
    this.router.navigate([this.url]);
  }
}
