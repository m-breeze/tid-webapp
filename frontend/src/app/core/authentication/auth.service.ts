import {Injectable} from '@angular/core';
import {AuthHttpService} from '../../shared/http-services/authentication/auth-http.service';
import {SignIn} from '../../components/authentication/components/sign-in/models/sign-in.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
  ) {

  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/authentication']);
  }

  public signIn(user: SignIn)
  : void {
    this.authHttpService.signIn(user)
      .subscribe(
        (token) => {
          console.log('success');
          this.setCurrentUserToLocalStorage(user, token);
          this.router.navigate(['/timeline']);
        },
            (err) => console.log(err),
      );
  }

  private setCurrentUserToLocalStorage(user: SignIn, token: string)
  : void {
    const currentUser: Partial<SignIn> = {
      username: user.username,
      token,
    }
    localStorage.setItem('currentUser',
      JSON.stringify(currentUser));
  }

}
