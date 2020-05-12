import { Component, OnInit } from '@angular/core';
import { FullTimelineEventRenderModel } from './full-timeline-event.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state.interface';
import { getEventsTimeLineList } from '../../store/events-list/events-list.selectors';
import { Observable } from 'rxjs';
import { DeleteEvent, FetchEvents } from '../../store/events-list/events-list.actions';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ViewEventComponent } from './view-event/view-event.component';
import { BsModalService } from 'ngx-bootstrap';

interface TimelineTick {
  date: Date;
  leftPosition: number;
}

@Component({
  selector: 'app-full-timeline',
  templateUrl: './full-timeline.component.html',
  styleUrls: ['./full-timeline.component.scss']
})
export class FullTimelineComponent implements OnInit {

  public events$: Observable<FullTimelineEventRenderModel[]> = this.store.select(getEventsTimeLineList);
  public timelineTicksDates: TimelineTick[] = [];
  public readonly blockWidth = 200;

  constructor(
    private store: Store<AppState>,
    private bsModalService: BsModalService,
  ) {
  }

  public ngOnInit(): void {
      this.store.dispatch(FetchEvents());
      this.events$
        .pipe(filter(events => events.length > 0))
        .subscribe((events) => {
        const firstEventDate = new Date(new Date (events[0].date).setDate(1));
        const lastEventDate = new Date(new Date(events[events.length - 1].date).setDate(1));
        for (let date = firstEventDate;
             date <= new Date(new Date(lastEventDate).setMonth(lastEventDate.getMonth() + 1));
             date = new Date(new Date(date).setMonth(date.getMonth() + 1))
        ) {
          const tick: TimelineTick = {
            date,
            leftPosition: this.getTickHorizontalPosition(date, firstEventDate, lastEventDate),
          };
          this.timelineTicksDates.push(tick);
        }
      });
  }

  public onDelete(id: number): void {
    this.store.dispatch(DeleteEvent(id));
  }

  public viewEvent(event: FullTimelineEventRenderModel): void {
    this.bsModalService.show(ViewEventComponent, {
      initialState: {
        event
      },
      class: 'wide-modal'
    });
  }

  private getTickHorizontalPosition(eventDate: Date, firstDate: Date, lastDate: Date): number {
    const lastEventDate = new Date(lastDate);
    const lastDayOfLastMonth = new Date(lastEventDate.getFullYear(), lastEventDate.getMonth() + 1, 0).getDate();
    return (eventDate.getTime() - firstDate.getTime()) / (lastEventDate.setDate(lastDayOfLastMonth) - firstDate.getTime()) * 100;
  }
}
