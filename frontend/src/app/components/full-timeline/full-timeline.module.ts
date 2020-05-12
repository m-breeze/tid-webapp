import { NgModule } from '@angular/core';
import { FullTimelineComponent } from './full-timeline.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { ViewEventComponent } from './view-event/view-event.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  declarations: [
    FullTimelineComponent,
    ViewEventComponent,
  ],
  entryComponents: [
    ViewEventComponent,
  ]
})
export class FullTimelineModule {}
