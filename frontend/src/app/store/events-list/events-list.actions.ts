import { action, payload } from 'ts-action';
import { EventModel } from '../../components/timeline/models/event.model';
import { FullTimelineEventRenderModel } from '../../components/full-timeline/full-timeline-event.model';

export const FetchEvents = action('[Events] Fetch events', payload<void>());
export const SetEvents = action('[Events] Set events', payload<EventModel[]>());
export const AddEvent = action('[Events] Add event', payload<EventModel>());
export const AddEventSuccessfully = action('[Events] Add event successfully', payload<EventModel>());
export const DeleteEvent = action('[Events] Delete event', payload<number>());
export const DeleteEventSuccessfully = action('[Events] Delete event successfully', payload<number>());

export const MapEventsForRender = action('[Events] Map Events For Render', payload<EventModel[]>());
export const SetEventsForRender = action('[Events] Set Events For Render', payload<FullTimelineEventRenderModel[]>());
