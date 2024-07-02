import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.authService.login(this.accountId, this.password).subscribe({
      next: (resp: any) => {
        if (resp.success) {
          localStorage.setItem('token', resp?.token);
          localStorage.setItem('roles', JSON.stringify(resp?.data?.role));
          this.authService.navigateToDashboard(resp?.data?.role[0]);
        } else {
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
              message: resp.message,
            },
            duration: 3000,
          });
        }
      },
    });
  }
}
