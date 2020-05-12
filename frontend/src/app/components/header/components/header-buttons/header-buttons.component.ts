import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {AddEventComponent} from '../../../add-event/add-event.component';

@Component({
  selector: 'kst-tid-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
  ) { }

  public ngOnInit()
  : void {
  }

  public onAddEvent()
  : void {
    this.bsModalService.show(AddEventComponent, {class: 'standard-modal'});
  }

}
