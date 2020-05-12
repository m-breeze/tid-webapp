import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SignUpFormService} from './services/sign-up-form.service';
import {AuthHttpService} from '../../../../shared/http-services/authentication/auth-http.service';
import {AbstractComponent} from '../../../../shared/abstract-component/abstractComponent';

@Component({
  selector: 'kst-tid-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends AbstractComponent implements OnInit {

  public form: FormGroup;
  public hidePassword: boolean;

  constructor(
    private signUpFormService: SignUpFormService,
    private authHttpService: AuthHttpService,
  ) {
    super();
    this.hidePassword = true;
    this.form = this.signUpFormService.buildForm();
  }

  ngOnInit() {
  }

  private get isFormValid()
  : boolean {
    this.markAllFormControlsTouched(this.form);
    return this.form.valid;
  }

  public onSubmit()
  : void {
    if (!this.isFormValid) {
      return ;
    }

    const user = this.signUpFormService.mapFormToRequest(this.form);
    this.authHttpService.createUser(user)
      .subscribe(
        () => console.log('success'),
        (err) => console.log(err),
      );
  }
}
