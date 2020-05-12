import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../core/authentication/auth.service';

@Component({
  selector: 'kst-tid-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  public onLogOut()
  : void {
    this.authService.logout();
  }
}
