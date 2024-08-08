import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      schoolId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(response => {
        console.log('User added successfully', response);
        let config: MatSnackBarConfig = {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['green-snackbar'],
        };

        this._snackBar.openFromComponent(SnackbarComponent, {
          ...config,
          data: {
            error: true,
            message: 'User Added Succsesful',
          },
          duration: 3000,
        });
      }, error => {
        console.error('Error adding user', error);
        let config: MatSnackBarConfig = {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['red-snackbar'],
        };

        this._snackBar.openFromComponent(SnackbarComponent, {
          ...config,
          data: {
            error: true,
            message: error,
          },
          duration: 3000,
        });
      });
    }
  }
}
