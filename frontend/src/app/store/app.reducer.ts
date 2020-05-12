import { AppState } from './app-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { eventsReducer, fullTimeLineEventsReducer, } from './events-list/events-list.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  eventsTimeLineList: fullTimeLineEventsReducer,
  events: eventsReducer,
};
