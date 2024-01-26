import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {MovieInterface, SimilarMovieInterface} from '../../types/movie.interface';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {MoviesService} from '../../services/movie/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  movie!: MovieInterface
  similarMovies: SimilarMovieInterface[] = []


  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.getData()
    this.getMovies()
    this.updateCount()
  }

  updateCount() {
    this.movieService.updateCountOpened(this.movie.slug)
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  getMovies() {
    this.movieService.getMoviesByGenres(this.movie.genres.map((genre) => genre._id))
      .pipe(
        map((data) => data.map((movie) => ({
          name: movie.title,
          poster: movie.poster,
          url: `/movie/${movie.slug}`,
          _id: movie._id,

        }))
          .filter((movie) => movie._id !== this.movie._id)
          .slice(0, 5)),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.similarMovies = data
      })
  }

  getData() {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        this.movie = data['data']
      });
  }
}
