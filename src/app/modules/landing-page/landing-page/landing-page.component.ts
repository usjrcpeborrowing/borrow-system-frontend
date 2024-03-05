import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('panelTransition', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('logoTransition', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit{
  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }
  directToLogin(): void {
    this.router.navigate(['/login']);
  }
  

}

