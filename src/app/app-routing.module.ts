import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'landing-page',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'borrow',
    loadChildren: () => import('./modules/borrow/borrow.module').then((m) => m.BorrowModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator', 'oic', 'reads', 'student', 'faculty'],
    },
  },
  {
    path: 'borrowed-list',
    loadChildren: () => import('./modules/borrowed-list/borrowed-list.module').then((m) => m.BorrowedListModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['reads', 'oic', 'faculty'],
    },
  },
  {
    path: 'student-borrowed-list',
    loadChildren: () => import('./modules/student-borrowed-list/student-borrowed-list.module').then((m) => m.StudentBorrowedListModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['student', 'reads'],
    },
  },
  {
    path: 'inventory',
    loadChildren: () => import('./modules/inventory/inventory.module').then((m) => m.InventoryModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator', 'oic', 'reads', 'faculty'],
    },
  },
  {
    path: 'item-details',
    loadChildren: () => import('./modules/item-details/item-details.module').then((m) => m.ItemDetailsModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator', 'oic', 'reads', 'faculty'],
    },
    // canActivate: [AuthGuard]
  },
  {
    path: 'history',
    loadChildren: () => import('./modules/history/history.module').then((m) => m.HistoryModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator', 'oic', 'reads','student', 'faculty'],
    },
  },

  {
    path: 'account-manager',
    loadChildren: () => import('./modules/account-manager/account-manager.module').then((m) => m.AccountManagerModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator'],
    },
  },

  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['administrator'],
    },
  },
  {
    path: '**',
    redirectTo: 'landing-page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
