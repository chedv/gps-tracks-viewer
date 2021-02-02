import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { LoginFormBuilder } from '../forms/login-form-builder';
import { RegisterFormBuilder } from '../forms/register-form-builder';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [LoginFormBuilder, RegisterFormBuilder]
})
export class AuthModule { }
