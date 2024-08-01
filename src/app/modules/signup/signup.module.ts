import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../material.module';
import { SignupHeaderComponent } from './signup-header/signup-header.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  declarations: [
    SignupComponent,
    SignupHeaderComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MaterialModule
  ]
})
export class SignupModule { }
