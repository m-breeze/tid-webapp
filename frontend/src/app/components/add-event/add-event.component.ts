import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormGroup} from '@angular/forms';
import {AddEventFormService} from './services/add-event-form.service';
import {TidErrorStateMatcher} from '../../shared/error-state-matcher/error-state-matcher';
import { AppState } from '../../store/app-state.interface';
import { Store } from '@ngrx/store';
import { AddEvent } from '../../store/events-list/events-list.actions';

@Component({
  selector: 'kst-tid-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public form: FormGroup;
  public errorMatcher: TidErrorStateMatcher;

  constructor(
    private bsModalRef: BsModalRef,
    private addEventFormService: AddEventFormService,
    private store: Store<AppState>,
  ) {
    this.form = this.addEventFormService.buildForm();
    this.errorMatcher = new TidErrorStateMatcher();
  }

  ngOnInit() {
  }

  public onClose()
  : void {
    this.bsModalRef.hide();
  }

  public onSave()
  : void {
    if (this.form.valid) {
      const request = this.addEventFormService.buildEventRequest(this.form);
      this.store.dispatch(AddEvent(request));
      this.bsModalRef.hide();
    }
  }
}
