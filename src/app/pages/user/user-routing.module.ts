import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'confirm-user',
    component: ConfirmRegisterComponent
  },
  {
    path: 'confirm-user/:id',
    component: ConfirmRegisterComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'confirm-password',
    component: ConfirmResetPasswordComponent
  },
  {
    path: 'confirm-password/:id',
    component: ConfirmResetPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
