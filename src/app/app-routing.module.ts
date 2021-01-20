import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { DevicesComponent } from './core/devices/devices.component';

const rootRoutes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/logout', component: LogoutComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'devices', component: DevicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
