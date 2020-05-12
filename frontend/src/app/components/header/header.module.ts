import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NavigationModule} from './components/navigation/navigation.module';
import {HeaderButtonsComponent} from './components/header-buttons/header-buttons.component';
import {SharedModule} from '../../shared/shared-module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderButtonsComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    SharedModule,
  ]
})
export class HeaderModule { }
