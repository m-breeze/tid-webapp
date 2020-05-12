import {NgModule} from '@angular/core';
import {AddEventComponent} from '../add-event/add-event.component';
import {SharedModule} from '../../shared/shared-module';
import {CommonModule} from '@angular/common';
import { TimelineContainerComponent } from './containers/timeline-container.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { EventComponent } from './components/event/event.component';
import { EventPreviewComponent } from './components/event-preview/event-preview.component';
import { TimelineSidebarComponent } from './components/timeline-sidebar/timeline-sidebar.component';

@NgModule({
  declarations: [
   AddEventComponent,
   TimelineContainerComponent,
   TimelineComponent,
    EventComponent,
    EventPreviewComponent,
    TimelineSidebarComponent,
  ],
  entryComponents: [
    AddEventComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    CommonModule,
  ],
  providers: [],
})
export class TimelineModule { }
