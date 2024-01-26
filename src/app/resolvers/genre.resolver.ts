import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {GenreService} from '../services/genre/genre.service';

@Injectable({
  providedIn: 'root',
})
export class GenreResolver implements Resolve<any> {
  constructor(
    private genreService: GenreService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.params['slug'];

    return this.genreService.getGenreBySlug(slug).pipe(
      switchMap((genre) => {
        if (genre) {
          return this.genreService.getGenresByIds([genre._id]).pipe(
            catchError(() => {
              this.router.navigate(['/']);
              return EMPTY;
            }),
            switchMap((movies) => {
              return of({ genre, movies });
            })
          );
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
