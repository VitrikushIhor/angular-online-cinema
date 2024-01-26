import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {UserService} from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserEditResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.userService.getUserById(id).pipe(
      switchMap(userData => {
        if (userData) {
          return of(userData);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return EMPTY;
      }),
    );
  }
}
