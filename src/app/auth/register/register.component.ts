import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthFormsBuilder } from '../../forms/auth-forms-builder';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(private formsBuilder: AuthFormsBuilder,
              private authService: AuthService,
              private router: Router)
  {
    this.registerForm = this.formsBuilder.buildRegisterForm();
  }

  checkControl(controlName: string): boolean {
    return this.registerForm.controls[controlName].invalid
        && this.registerForm.controls[controlName].touched;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const result = this.registerForm.value;
    this.authService.register(result.email, result.password);

    this.router.navigate(['']);
  }
}
