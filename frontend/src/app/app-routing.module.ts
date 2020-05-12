import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './components/authentication/components/authentication.component';
import {AuthGuard} from './core/guards/auth-guard';
import {HomeComponent} from './components/home/home.component';
import {AuthorizedUserGuard} from './core/guards/authorized-user.guard';
import { FullTimelineComponent } from './components/full-timeline/full-timeline.component';


const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthorizedUserGuard ],
  },
  {
    path: 'timeline',
    component: FullTimelineComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
