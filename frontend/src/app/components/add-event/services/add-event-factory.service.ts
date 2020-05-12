import {Injectable} from '@angular/core';
import { EventModel } from '../../timeline/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class AddEventFactoryService {

  public create()
  : EventModel {
    return new EventModel ({
      date: null,
      title: null,
      description: null,
    });
  }
}
