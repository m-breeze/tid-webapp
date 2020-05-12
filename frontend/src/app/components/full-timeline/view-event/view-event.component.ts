import { Component, OnInit } from '@angular/core';
import { FullTimelineEventRenderModel } from '../full-timeline-event.model';
import { AppState } from '../../../store/app-state.interface';
import { Store } from '@ngrx/store';
import { DeleteEvent } from '../../../store/events-list/events-list.actions';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  public event: FullTimelineEventRenderModel;

  constructor(
    private store: Store<AppState>,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
  }

  deleteEvent(id: number): void {
    this.store.dispatch(DeleteEvent(id));
    this.bsModalRef.hide();
  }

}
