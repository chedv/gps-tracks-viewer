import { FormBuilder, FormGroup, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { IAuthFormsBuilder } from './auth-forms-builder';

export class RegisterFormBuilder extends FormBuilder implements IAuthFormsBuilder {
  static validatePasswordMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password === confirmPassword) {
      return null;
    }

    const error = {mustMatch: true};
    control.get('confirmPassword')?.setErrors(error);
    return (error);
  }

  buildForm(): FormGroup {
    return this.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      firstName: ['', []],
      lastName: ['', []],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    }, {
      validators: RegisterFormBuilder.validatePasswordMatching,
    });
  }
}
