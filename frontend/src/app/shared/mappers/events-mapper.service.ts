import { Injectable } from '@angular/core';
import { FullTimelineEventRenderModel } from '../../components/full-timeline/full-timeline-event.model';
import { EventModel } from '../../components/timeline/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsMapperService {

  public readonly blockWidth: number = 200;
  public readonly blockHeight: number = 75;
  public readonly verticalGap: number = 15;
  public readonly horizontalGap: number = 35;
  private readonly defaultTopPosition: number = 20;

  private firstEventDate: number;
  private lastEventDate: number;

  public mapEvents(events: EventModel[]): FullTimelineEventRenderModel[] {
    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.firstEventDate = new Date(sortedEvents[0].date).getTime();
    this.lastEventDate = new Date(sortedEvents[events.length - 1].date).getTime();
    const mappedEvents: FullTimelineEventRenderModel[] = [];
    sortedEvents.forEach((event, i) => {
      const {id, title, description, img} = event;
      const date = new Date(event.date).getTime();
      const mappedEvent: FullTimelineEventRenderModel = {
        id,
        title,
        description,
        date,
        img,
        leftPosition: this.getEventHorizontalPosition(date),
        topPosition: i === 0 ? this.defaultTopPosition : this.getEventVerticalPosition(mappedEvents, date),
        zIndex: 1000 - i,
      };
      mappedEvents.push(mappedEvent);
    });
    return mappedEvents;
  }

  public getEventHorizontalPosition(eventDate: number): number {
    const lastDate = new Date(this.lastEventDate);
    const lastDayOfLastMonth = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 0).getDate();
    return (eventDate - new Date(this.firstEventDate).setDate(1)) / (lastDate.setDate(lastDayOfLastMonth) - new Date(this.firstEventDate).setDate(1)) * 100;
  }

  public getEventVerticalPosition(events: FullTimelineEventRenderModel[], eventDate: number): number {
    const evensReversed = [...events].reverse();
    const currEventHorizontalPosition = this.getEventHorizontalPosition(eventDate) / 100 * window.innerWidth;
    const needableSpace = this.blockWidth + this.horizontalGap;
    let currEventTopPosition = this.defaultTopPosition;
    let previousSameLevelEvent = evensReversed.find((event) => event.topPosition === currEventTopPosition);

    while (previousSameLevelEvent && (((previousSameLevelEvent.leftPosition / 100 * window.innerWidth) + needableSpace) > currEventHorizontalPosition)) {
      currEventTopPosition = currEventTopPosition + this.blockHeight + this.verticalGap;
      previousSameLevelEvent = evensReversed.find(
        (event) => event.topPosition === currEventTopPosition);
    }

    return currEventTopPosition;
  }
}
