import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {GenreService} from '../services/genre/genre.service';

@Injectable({
  providedIn: 'root',
})
export class GenreCreateResolver implements Resolve<any> {

  constructor(
    private genreService: GenreService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.genreService.getGenreById(id).pipe(
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
