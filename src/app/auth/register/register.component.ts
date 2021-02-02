import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseAuthComponent } from '../base-auth.component';
import { RegisterFormBuilder} from '../../forms/register-form-builder';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseAuthComponent {
  constructor(private formsBuilder: RegisterFormBuilder,
              protected authService: AuthService,
              protected router: Router)
  {
    super(formsBuilder, authService, router);
  }
}
