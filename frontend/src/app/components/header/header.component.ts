import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/authentication/user.service';

@Component({
  selector: 'kst-tid-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  get isLoggedIn()
  : boolean {
    return this.userService.getUser() && true;
  }

}
