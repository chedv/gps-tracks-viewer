import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseAuthComponent } from '../base-auth.component';
import { LoginFormBuilder } from '../../forms/login-form-builder';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseAuthComponent {
  constructor(private formsBuilder: LoginFormBuilder,
              protected authService: AuthService,
              protected router: Router)
  {
    super(formsBuilder, authService, router);
  }
}
