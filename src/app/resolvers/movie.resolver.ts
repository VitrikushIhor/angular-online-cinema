import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {MoviesService} from '../services/movie/movies.service';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<any> {
  constructor(
    private moviesService: MoviesService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.params['slug'];

    return this.moviesService.getMovieBySlug(slug).pipe(
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
