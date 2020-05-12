import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {SignIn} from '../../components/authentication/components/sign-in/models/sign-in.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  private get token() {
    if (!localStorage.getItem('currentUser')) {
      return null;
    }

    const currentUser: SignIn =  JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token
    return token;
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
        responseType: 'text',
      });

      return next.handle(cloned);
    } else {
      const cloned = request.clone({
        responseType: 'text',
      });
      return next.handle(cloned);
    }
  }
}
