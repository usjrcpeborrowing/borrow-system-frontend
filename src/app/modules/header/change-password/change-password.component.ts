import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
      }
    );

    // this.changePasswordForm.addValidators(this.matchValidator(this.changePasswordForm.controls['newPassword'], this.changePasswordForm.controls['confirmPassword']));
  }

  async passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
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

  matchValidator(control: AbstractControl, controlTwo: AbstractControl): ValidatorFn {
    return () => {
      if (control.value !== controlTwo.value) return { match_error: 'Value does not match' };
      return null;
    };
  }

  onChangePassword() {
    console.log(this.changePasswordForm.errors);
    if (this.changePasswordForm.valid) {
      // const { currentPassword, newPassword } = this.changePasswordForm.value;
      // const currentUser = this.authService.getCurrentUser();

      // if (currentUser) {
      //   this.userService.changePassword(currentUser.userId, currentPassword, newPassword).subscribe({
      //     next: (response) => {
      //       alert('Password changed successfully!');
      //     },
      //     error: (error) => {
      //       console.error('Error changing password', error);
      //       alert('Failed to change password. Please try again.');
      //     },
      //   });
      // }
      this.dialogRef.close(this.changePasswordForm.value);
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
