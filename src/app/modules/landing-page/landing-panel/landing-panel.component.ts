import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-panel',
  templateUrl: './landing-panel.component.html',
  styleUrls: ['./landing-panel.component.css']
})
export class LandingPanelComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      const splitElement = document.querySelector('.split');
      if (splitElement) {
        splitElement.classList.add('swipe-right');
      }
    });
  }

  directToLogin(): void {
    this.router.navigate(['/login']);
  }
}
