import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatMenuModule} from '@angular/material';

import {NavigationComponent} from './components/navigation.component';
import {SharedModule} from '../../../../shared/shared-module';

@NgModule({
  declarations: [NavigationComponent],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
  ]
})
export class NavigationModule { }
