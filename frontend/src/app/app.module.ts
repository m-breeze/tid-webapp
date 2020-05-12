import {BrowserModule} from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TimelineModule} from './components/timeline/timeline.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {AuthInterceptorService} from './core/authentication/auth-interceptor.service';
import {HomeModule} from './components/home/home.module';
import { FullTimelineModule } from './components/full-timeline/full-timeline.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsListEffects } from './store/events-list/events-list.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export const ROOT_REDUCER = new InjectionToken<any>('Root Reducer');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    TimelineModule,
    AuthenticationModule,
    HomeModule,
    FullTimelineModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([EventsListEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {provide: ROOT_REDUCER, useValue: appReducer},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
