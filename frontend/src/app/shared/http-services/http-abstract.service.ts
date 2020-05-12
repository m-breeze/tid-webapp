import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

export abstract class AbstractHttpService {

  constructor(
    protected snackBar: MatSnackBar,
  ) {
  }

  public get apiUrl()
    : string {
    return environment.backEndUrl;
  }

  public handleError(error)
    : Observable<never> {

    const errorMessage = JSON.parse(error.error).message;

    this.snackBar.open(errorMessage, null,  {
      duration: 2000,
    });

    return throwError(errorMessage);
  }

  public buildHttpParams(obj: { [key: string]: any } | null)
    : HttpParams {
    let httpParams = new HttpParams();

    if (obj !== null) {
      Object
        .keys(obj)
        .filter((key) => !this.isEmpty(obj[key]))
        .forEach((key) => httpParams = httpParams.set(key, obj[key]));
    }

    return httpParams;
  }

  public serializeJsonPayload(object: Object)
    : string {
    return normalize(JSON.stringify(object));

    function normalize(str: string)
      : string {
      const doubleQuote = '"';
      const firstChar = str.charAt(0);
      const lastChar = str.charAt(str.length - 1);

      if (firstChar === doubleQuote && lastChar === doubleQuote) {
        return str.substr(1, str.length - 2);
      } else {
        return str;
      }
    }
  }

  private isEmpty(value: any)
    : boolean {
    return value === null || typeof value === 'undefined';
  }
}
