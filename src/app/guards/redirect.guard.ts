import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {RedirectService} from '../services/redirect/redirect.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {

  constructor(private redirectService: RedirectService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const redirect = route.queryParams['redirect'];
    if (redirect) {
      this.redirectService.setRedirectUrl(redirect);
    }
    return true;
  }
}
