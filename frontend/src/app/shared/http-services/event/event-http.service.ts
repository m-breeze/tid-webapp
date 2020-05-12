import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { EventModel } from '../../../components/timeline/models/event.model';
import {Observable} from 'rxjs';
import {AbstractHttpService} from '../http-abstract.service';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EventHttpService extends AbstractHttpService {

  private path: string;

  constructor(
    private http: HttpClient,
    protected snackBar: MatSnackBar,
  ) {
    super(snackBar);
    this.path = `${this.apiUrl}events/`;
  }

  public createEvent(event: EventModel)
  : Observable<EventModel> {
    return this.http.post(`${this.path}`, event)
      .pipe(
        map((res: string) => JSON.parse(res)),
        catchError(this.handleError.bind(this)),
      );
  }

  public getEvents()
  : Observable<EventModel[]> {
    return this.http.get(`${this.path}`)
      .pipe(
        map((res: string) => JSON.parse(res)),
        catchError(this.handleError.bind(this)),
      );
  }

  public deleteEvent(id: number): Observable<void> {
    return this.http.delete(`${this.path}${id}`)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }
}
