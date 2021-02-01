import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

import { BaseAuthComponent } from '../base-auth.component';
import { LoginFormBuilder } from '../../forms/login-form-builder';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent extends BaseAuthComponent {
  constructor(private formsBuilder: LoginFormBuilder,
              @Inject(AuthService) authService: AuthService,
              @Inject(Router) router: Router)
  {
    super(formsBuilder, authService, router);
  }
}
