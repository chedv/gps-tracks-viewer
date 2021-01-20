import { FormBuilder, FormGroup, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export class AuthFormsBuilder extends FormBuilder {
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

  buildRegisterForm(): FormGroup {
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
      validators: AuthFormsBuilder.validatePasswordMatching,
    });
  }

  buildLoginForm(): FormGroup {
    return this.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    });
  }
}
