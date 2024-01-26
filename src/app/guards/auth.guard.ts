import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor
  (private userService: UserService,
   private router: Router
    ,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot,
  ):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.user$.getValue()
    if (user) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
