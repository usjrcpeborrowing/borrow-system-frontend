
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-header',
  templateUrl: './signup-header.component.html',
  styleUrls: ['./signup-header.component.css']
})
export class SignupHeaderComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  directToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  directToLandingPage(event: Event): void {
    
    event.preventDefault();
    this.router.navigate(['/landing-page']);
  }
}
