import {ModuleWithProviders, NgModule} from '@angular/core';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {EventHttpService} from './http-services/event/event-http.service';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Bootstrap Modules
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),

    // Material Modules
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    EventHttpService,
  ],
  exports: [
    ReactiveFormsModule,
    AppRoutingModule,

    // Material Modules
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        EventHttpService,
      ]
    };
  }
}
