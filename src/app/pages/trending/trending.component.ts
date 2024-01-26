import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movie/movies.service';
import {MovieInterface} from '../../types/movie.interface';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit, OnDestroy {
  movies: MovieInterface[] = [];
  isLoading: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private moviesService: MoviesService,
    private toastService: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.getPopularMovies()
  }

  getPopularMovies() {
    this.moviesService.getPopularMovies()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (movies) => {
          this.movies = movies;
        },
        (error) => {
          this.isLoading = false
          this.toastService.error(error.error.message);
        },
        () => {
          this.isLoading = false
        },
      );
  }
}
