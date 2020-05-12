import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../../../shared/abstract-component/abstractComponent';
import {FormGroup} from '@angular/forms';
import {SignInFormService} from './services/sign-in-form.service';
import {AuthService} from '../../../../core/authentication/auth.service';

@Component({
  selector: 'kst-tid-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends AbstractComponent implements OnInit {

  public form: FormGroup;
  public hidePassword: boolean;

  constructor(
    private signInFormService: SignInFormService,
    private authService: AuthService,
  ) {
    super();
    this.hidePassword = true;
    this.form = this.signInFormService.buildForm();
  }

  ngOnInit() {
  }

  private get isFormValid()
  : boolean {
    this.markAllFormControlsTouched(this.form);
    return this.form.valid;
  }

  public onSubmit(): void {
    if (!this.isFormValid) {
      return ;
    }

    this.authService.signIn(this.form.value);
  }

}
