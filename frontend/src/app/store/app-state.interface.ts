import { EventModel } from '../components/timeline/models/event.model';
import { FullTimelineEventRenderModel } from '../components/full-timeline/full-timeline-event.model';

export interface AppState {
  events: EventModel[];
  eventsTimeLineList: FullTimelineEventRenderModel[];
}
