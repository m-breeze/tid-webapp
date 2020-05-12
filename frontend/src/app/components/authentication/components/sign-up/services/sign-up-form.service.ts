import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SignUp} from '../models/sign-up.model';
import {FormValidationService} from '../../../../../shared/validatiors/services/form-validation-service';

@Injectable({
  providedIn: 'root',
})
export class SignUpFormService {

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
  ) {}

  public buildForm()
  : FormGroup {
   return this.formBuilder.group({
      username: [
        null,
        Validators.required,
      ],
      email: [
        null,
        [
          Validators.required,
          this.formValidationService.emailValidator,
        ],
      ],
      password: [
        null,
        Validators.required,
      ],
      confirmPassword: [
        null,
        Validators.required,
      ],
    }, {
     validators: this.formValidationService.mustMatch('password', 'confirmPassword'),
   });
  }

  public mapFormToRequest(form: FormGroup)
  : SignUp {
      const {username, email, password} = form.value;

      const req = new SignUp({
        username,
        email,
        password,
      });
      return req;
  }
}
