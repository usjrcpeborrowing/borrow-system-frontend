import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../modules/shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, isError: boolean = false): void {
    let config: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    };

    if (isError) {
      config.panelClass = ['red-snackbar'];
    } else {
      config.panelClass = ['green-snackbar'];
    }

    this._snackBar.openFromComponent(SnackbarComponent, {
      ...config,
      data: {
        error: isError,
        message: message,
      },
      duration: 3000,
    });
  }
}
