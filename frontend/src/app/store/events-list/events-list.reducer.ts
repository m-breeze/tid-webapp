import { on, payload, reducer } from 'ts-action';
import { EventModel } from '../../components/timeline/models/event.model';
import { AddEvent, AddEventSuccessfully, DeleteEvent, SetEvents, SetEventsForRender } from './events-list.actions';
import { FullTimelineEventRenderModel } from '../../components/full-timeline/full-timeline-event.model';

export const eventsInitialState: EventModel[] = [];

export const eventsReducer = reducer(
  eventsInitialState,
  on(SetEvents, (state, action) => ( action.payload )),
  on(AddEventSuccessfully, (state, action) => ([
      ...state,
      action.payload ,
    ])),
  on(DeleteEvent, (state, { payload }) => ([
      ...state.filter((event) => event.id !== payload)
    ])),
);

export const fullTimelineEventsInitialState: FullTimelineEventRenderModel[] = [];

export const fullTimeLineEventsReducer = reducer(
  fullTimelineEventsInitialState,
  on(SetEventsForRender, (state, action) => ( action.payload )),
);
