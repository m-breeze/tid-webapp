import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignInFormService {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  public buildForm()
  : FormGroup {
    return this.formBuilder.group({
      username: [
        null,
        Validators.required,
      ],
      password: [
        null,
        Validators.required,
      ],
    });
  }
}
