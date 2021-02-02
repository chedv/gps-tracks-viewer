import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IAuthFormsBuilder } from '../forms/auth-forms-builder';
import { AuthService } from '../services/auth.service';
import { Response } from '../models/response.model';

export class BaseAuthComponent {
  public form: FormGroup;
  public errors: string | null;
  private actions: { [name: string]: (params: object) => Observable<Response> };

  constructor(formsBuilder: IAuthFormsBuilder,
              authService: AuthService,
              protected router: Router)
  {
    this.form = formsBuilder.buildForm();
    this.errors = null;
    this.actions = {
      login: (params: object) => authService.login(params),
      register: (params: object) => authService.register(params)
    };
  }

  checkControl(controlName: string): boolean {
    return this.form.controls[controlName].invalid
        && this.form.controls[controlName].touched;
  }

  onSubmit(action: string): void {
    if (this.form.invalid) {
      return;
    }
    const result = this.form.value;
    this.actions[action](result)
      .subscribe(response => {
        if (!response.error) {
          this.router.navigate(['']);
        }
        else {
          this.errors = response.message;
        }
      });
  }
}
