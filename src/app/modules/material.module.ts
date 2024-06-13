import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatInputModule, MatIconModule, MatSidenavModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatPaginatorModule, MatMenuModule],
})
export class MaterialModule {}
