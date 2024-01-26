import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {concatMap, debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {MovieInterface} from '../../../types/movie.interface';
import {Router} from '@angular/router';
import {MoviesService} from '../../../services/movie/movies.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {

  searchQueryControl: FormControl = new FormControl('');
  destroy$: Subject<boolean> = new Subject();
  movies: MovieInterface[] = []
  isLoading: boolean = true
  currentPage: number = 1

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private toast: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getMovies()
    this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.moviesService.getMovies(value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.movies = data
            this.isLoading = false
          })
      });
  }

  getMovies() {
    this.moviesService.getMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.movies = data
        this.isLoading = false
      })
  }

  onRedirect(id: string) {
    this.router.navigate([`/admin/edit/movie/${id}`])
  }

  removeMovie(id: string) {
    this.moviesService.deleteMovieById(id)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => this.moviesService.getMovies()),
      )
      .subscribe((data) => {
        this.movies = data
        this.toast.success('Movie deleted successfully')
      }, () => {
        this.toast.error('Error')
      })
  }

  createMovie() {
    this.moviesService.createMovieId()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
          this.toast.success('Movie created successfully')
          this.router.navigate([`admin/create/movie/${data}`])
        },
        () => {
          this.toast.error('Error')
        },
      )
  }

}
