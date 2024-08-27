import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  accountId: string = '';
  password: string = '';

  snackbarconfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: ['red-snackbar'],
  };

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.authService.login(this.accountId, this.password).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          localStorage.setItem('token', resp?.token);
          localStorage.setItem('roles', JSON.stringify(resp?.data?.role));
          localStorage.setItem('user', JSON.stringify(resp?.data));

          this.authService.navigateToDashboard(resp?.data?.role[0]);
        } else {
          this._snackBar.openFromComponent(SnackbarComponent, {
            ...this.snackbarconfig,
            data: {
              error: true,
              message: resp.message,
            },
            duration: 3000,
          });
        }
      },
      error: (err) => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          ...this.snackbarconfig,
          data: {
            error: true,
            message: err.message,
          },
          duration: 3000,
        });
      },
    });
  }

  directToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
