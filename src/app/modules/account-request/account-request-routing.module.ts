import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRequestComponent } from './account-request/account-request.component';
const routes: Routes = [
  {
    path: '',
    component: AccountRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRequestRoutingModule { }
