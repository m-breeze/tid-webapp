import {Injectable} from '@angular/core';
import {SignIn} from '../../components/authentication/components/sign-in/models/sign-in.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: SignIn;

  constructor() {
  }

  public getUser()
  : SignIn | null {
    if (!localStorage.getItem('currentUser')) {
      return null;
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser;
  }
}
