import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {EventModel} from '../../../components/timeline/models/event.model';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../http-abstract.service';
import {catchError} from 'rxjs/operators';
import {SignUp} from '../../../components/authentication/components/sign-up/models/sign-up.model';
import {SignIn} from '../../../components/authentication/components/sign-in/models/sign-in.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends AbstractHttpService {

  private path: string;

  constructor(
    private http: HttpClient,
    protected snackBar: MatSnackBar,
  ) {
    super(snackBar);
    this.path = `${environment.backEndUrl}`;
  }

  public createUser(user: SignUp)
  : Observable<any> {
    return this.http.post(`${this.path}signup`, user)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  public signIn(user: SignIn)
  : Observable<any> {
    return this.http.post(`${this.path}login`, user)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

}
