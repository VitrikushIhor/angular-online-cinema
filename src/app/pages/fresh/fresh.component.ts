import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movie/movies.service';
import {MovieInterface} from '../../types/movie.interface';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-fresh',
  templateUrl: './fresh.component.html',
  styleUrls: ['./fresh.component.scss'],
})
export class FreshComponent implements OnInit, OnDestroy {
  movies: MovieInterface[] = [];
  isLoading: boolean = true
  destroy$: Subject<boolean> = new Subject();


  constructor(
    private moviesService: MoviesService,
    private toastService: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.moviesService.getMovies()
      .pipe(takeUntil(this.destroy$))
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
