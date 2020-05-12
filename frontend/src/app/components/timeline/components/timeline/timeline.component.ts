import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input()
  public events: EventModel[];
  @Input()
  public selectedEvent: EventModel;

  @Output()
  public eventSelect: EventEmitter<EventModel> = new EventEmitter<EventModel>();

  constructor() { }

  ngOnInit() {
  }

  public onEventSelect(event: EventModel): void {
    this.selectedEvent = event;
    this.eventSelect.emit(event);
  }

}
