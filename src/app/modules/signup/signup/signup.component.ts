import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  role: string = 'faculty'; // Default value for role
  age: number = 0;
  department: string = 'CPE'; // Default value for department
  email: string = '';
  schoolId: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    console.log('Form submitted', {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      role: this.role,
      age: this.age,
      department: this.department,
      email: this.email,
      schoolId: this.schoolId,
      password: this.password,
    });
  }
}
