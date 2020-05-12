import {HttpErrorResponse} from '@angular/common/http';

export class WrappedError {

  constructor(
    public message: string | null,
    public response: HttpErrorResponse | null,
  ) { }
}
