import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {ActorService} from '../services/actor/actor.service';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActorCreateResolver implements Resolve<any> {

  constructor(
    private actorService: ActorService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.actorService.getActorById(id).pipe(
      switchMap(data => {
        if (data) {
          return of(data);
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
