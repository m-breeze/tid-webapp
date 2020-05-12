import { Component, Input, OnInit, Output } from '@angular/core';
import { EventModel } from '../../models/event.model';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input()
  public event: EventModel;
  @Input()
  public isActive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
