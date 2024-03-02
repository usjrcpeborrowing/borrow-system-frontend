import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatInputModule, MatIconModule, MatSidenavModule, MatCardModule],
})
export class MaterialModule {}
