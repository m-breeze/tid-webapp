import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../authentication/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedUserGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.getUser()) {
      return true;
    }

    this.router.navigateByUrl('/timeline');
    return false;
  }
}

