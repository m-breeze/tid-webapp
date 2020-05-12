
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared-module';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './components/authentication.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {NavigationModule} from '../header/components/navigation/navigation.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule.forRoot(),
    CommonModule,
    NavigationModule,
  ],
  providers: [],
})
export class AuthenticationModule { }
