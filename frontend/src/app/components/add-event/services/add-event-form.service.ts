import {Injectable} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventModel} from '../../timeline/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class AddEventFormService {

  constructor(
    private fb: FormBuilder,
  ) {}

  public buildForm()
  : FormGroup {
    return this.fb.group({
      title: [
        null,
        Validators.required,
      ],
      date: [
        null,
        Validators.required,
      ],
      description: [
        null,
        Validators.required,
      ]
    });
  }

  public buildEventRequest(form: FormGroup)
  : EventModel {
    const formValue = form.value;

    return new EventModel({
      title: formValue.title,
      description: formValue.description,
      date: formValue.date.toISOString(),
    });
  }
}
