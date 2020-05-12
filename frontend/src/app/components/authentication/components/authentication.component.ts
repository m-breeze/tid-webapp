import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'kst-tid-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit  {

  @ViewChild('signUpText', {read: ElementRef, static: true})
  public signUpText: ElementRef;
  @ViewChild('signInText', {read: ElementRef, static: true})
  public signInText: ElementRef;

  isSignInViewActive: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit()
  : void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.isSignInViewActive = params.login;
    });
  }

  public toggleAuthButton()
  : void {
    this.isSignInViewActive ? this.switchToSignUpView() : this.switchToSignInView();
  }

  private switchToSignInView()
  : void {
    this.isSignInViewActive = true;

  }

  private switchToSignUpView()
  : void {
    this.isSignInViewActive = false;

  }

}
