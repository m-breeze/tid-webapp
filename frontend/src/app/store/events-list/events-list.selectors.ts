import { AppState } from '../app-state.interface';

export const getEventsTimeLineList = (appState: AppState) => appState.eventsTimeLineList;
export const getEventsList = (appState: AppState) => appState.events;
