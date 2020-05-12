import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  @Input()
  public event: EventModel;

  constructor() { }

  ngOnInit() {
  }

}
