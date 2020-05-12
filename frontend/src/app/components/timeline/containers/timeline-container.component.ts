import { Component, OnInit } from '@angular/core';
import { EventModel } from '../models/event.model';
import { EventHttpService } from '../../../shared/http-services/event/event-http.service';

@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.scss']
})
export class TimelineContainerComponent implements OnInit {

  public events: EventModel[];
  public selectedEvent: EventModel;

  constructor(
    private eventHttpService: EventHttpService,
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  public onEventSelect(event: EventModel): void {
    this.selectedEvent = event;
  }

  private getEvents(): void {
    this.eventHttpService.getEvents().subscribe(
      (events) => {
        this.events = events;
        this.selectedEvent = this.events[0];
      },
          (error) => console.log(error),
    );
  }

}
