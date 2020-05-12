import { Injectable } from '@angular/core';
import { EventHttpService } from '../../shared/http-services/event/event-http.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AddEvent, AddEventSuccessfully,
  DeleteEvent,
  DeleteEventSuccessfully,
  FetchEvents,
  MapEventsForRender,
  SetEvents,
  SetEventsForRender
} from './events-list.actions';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../app-state.interface';
import { Store } from '@ngrx/store';
import { EventsMapperService } from '../../shared/mappers/events-mapper.service';
import { getEventsList } from './events-list.selectors';

@Injectable()
export class EventsListEffects {

  constructor(
    private actions$: Actions,
    private eventHttpService: EventHttpService,
    private store: Store<AppState>,
    private eventsMapperService: EventsMapperService,
  ) {
  }

  @Effect()
  fetchEventsEffect$ = this.actions$.pipe(
    ofType(FetchEvents),
    switchMap(() => this.eventHttpService.getEvents()),
    switchMap((events) => [
      SetEvents(events),
      MapEventsForRender(events)
    ])
  );

  @Effect()
  addEventEffect$ = this.actions$.pipe(
    ofType(AddEvent),
    switchMap(({payload}) => this.eventHttpService.createEvent(payload)),
    map((event) => [this.store.dispatch(AddEventSuccessfully(event))]),
    withLatestFrom(this.store.select(getEventsList)),
    map(([, events]) => events),
    switchMap((events) => [MapEventsForRender(events)]),
  );

  @Effect()
  deleteEventEffect$ = this.actions$.pipe(
    ofType(DeleteEvent),
    mergeMap(({payload}) => {
      return this.eventHttpService.deleteEvent(payload).pipe(map(() => payload));
    }),
    map((id) => this.store.dispatch(DeleteEventSuccessfully(id))),
    withLatestFrom(this.store.select(getEventsList)),
    map(([, events]) => events),
    switchMap((events) => [MapEventsForRender(events)]),
  );

  @Effect()
  mapEventsForRenderEffect$ = this.actions$.pipe(
    ofType(MapEventsForRender),
    map(({payload}) => this.eventsMapperService.mapEvents(payload)),
    switchMap((events) => [SetEventsForRender(events)])
  );
}
