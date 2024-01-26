import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {ActorService} from '../services/actor/actor.service';
import {MoviesService} from '../services/movie/movies.service';
import {GenreService} from '../services/genre/genre.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieCreateResolver implements Resolve<any> {

  constructor(
    private actorService: ActorService,
    private movieService: MoviesService,
    private genreService: GenreService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return forkJoin({
      actors: this.actorService.getAllActors(),
      genres: this.genreService.getCollections(),
      movie: this.movieService.getMovieById(id),
    }).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return of(null);
      }),
    );

  }
}
