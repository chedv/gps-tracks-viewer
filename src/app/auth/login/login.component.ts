import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

import { AuthFormsBuilder } from '../../forms/auth-forms-builder';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public errors: string | null;

  constructor(private formsBuilder: AuthFormsBuilder,
              private authService: AuthService,
              private router: Router)
  {
    this.loginForm = this.formsBuilder.buildLoginForm();
    this.errors = null;
  }

  checkControl(controlName: string): boolean {
    return this.loginForm.controls[controlName].invalid
        && this.loginForm.controls[controlName].touched;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const result = this.loginForm.value;
    this.authService.login(result.email, result.password)
      .subscribe(response => {
        if ('token' in response) {
          this.router.navigate(['']);
        }
        else {
          this.errors = response.message;
        }
      });
  }
}
