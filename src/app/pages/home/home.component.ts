import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movie/movies.service';
import {mergeMap, of, Subject, takeUntil} from 'rxjs';
import {InterfaceActors, InterfaceSlides} from '../../types/home.interface';
import {ActorService} from '../../services/actor/actor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false
  slides: InterfaceSlides[] = [];
  actors: InterfaceActors[] = [];

  constructor(
    private actorService: ActorService,
    private moviesService: MoviesService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getMovies()
    this.getActors()
  }

  getActors() {
    this.actorService.getAllActors()
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((data) => {
          const actors: InterfaceActors[] = data.slice(0, 4).map((actor) => ({
            name: actor.name,
            posterPhoto: `https://online-cinema-api.onrender.com${actor.photo}`,
            _id: actor._id,
            url: `actor/${actor.slug}`,
            content: {
              title: actor.name,
              subTitle: `+${actor.countMovies} movies`,
            },
          }));
          return of(actors);
        }),
      )
      .subscribe((data) => {
        this.actors = data;
      });
  }

  getMovies() {
    this.moviesService.getMovies()
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((data) => {
          this.isLoading = true
          const slides: InterfaceSlides[] = data.map((movie) => ({
            _id: movie._id,
            link: `movie/${movie.slug}`,
            subTitle: movie.genres.map((i) => i.name).join(', '),
            title: movie.title,
            bigPoster: `https://online-cinema-api.onrender.com${movie.bigPoster}`,
          }));
          return of(slides);
        }),
      )
      .subscribe((data) => {
        this.slides = data;
        this.isLoading = false
      });
  }
}
