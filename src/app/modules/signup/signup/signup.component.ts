import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { Constants } from 'src/app/models/Constant';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  roles = ['student', 'faculty'];
  departmentlist = ['civil_engineering', 'computer_engineering', 'electrical_engineering', 'electronics_and_communications_engineering', 'industrial_engineering', 'mechanical_engineering'];
  selected_depts: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        role: ['student', Validators.required],
        age: ['', [Validators.required, Validators.min(0)]],
        department: [[], Validators.required],
        email: ['', [Validators.required, Validators.email]],
        schoolId: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required],
        search: [''],
      },
      { validator: this.ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selected_depts.push(event.option.value);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(
        (response) => {
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
              message: response.message,
            },
            duration: 3000,
          });
        },
        (error) => {
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
        }
      );
    }
  }

  checkForErrorsIn(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Min length is required';
    }
    if (formControl.hasError('confirmedValidator')) {
      return 'Password do not match';
    }

    return '';
  }
}
