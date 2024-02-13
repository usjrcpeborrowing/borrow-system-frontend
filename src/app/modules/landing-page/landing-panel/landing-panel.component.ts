import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-panel',
  templateUrl: './landing-panel.component.html',
  styleUrls: ['./landing-panel.component.css']
})
export class LandingPanelComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const splitElement = document.querySelector('.split');
      if (splitElement) {
        splitElement.classList.add('swipe-right');
      }
    });
  }
}
