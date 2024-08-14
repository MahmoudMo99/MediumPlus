import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationFormComponent,
    ResetPasswordFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgToastModule,
  ],
  exports: [
    LoginComponent,
    RegistrationFormComponent,
    ResetPasswordFormComponent,
  ],
})
export class AuthModule {}
