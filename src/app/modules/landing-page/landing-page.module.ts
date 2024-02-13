import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { LoginHeaderModule } from '../login-header/login-header.module';
import { LandingBackgroundComponent } from './landing-background/landing-background.component';
import { LandingPanelComponent } from './landing-panel/landing-panel.component';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    LandingPageComponent,
    LandingBackgroundComponent,
    LandingPanelComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LoginHeaderModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule
  ],
  bootstrap:[
    
  ]
})
export class LandingPageModule { }
