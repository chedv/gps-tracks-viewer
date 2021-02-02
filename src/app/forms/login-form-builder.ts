import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAuthFormsBuilder } from './auth-forms-builder';

export class LoginFormBuilder extends FormBuilder implements IAuthFormsBuilder {
  buildForm(): FormGroup {
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
