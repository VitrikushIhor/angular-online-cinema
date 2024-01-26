import {Component, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movie/movies.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Observable, Subject, takeUntil} from 'rxjs';
import {MovieInterface} from '../../types/movie.interface';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {UserInterface} from '../../types/auth.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  searchQueryControl: FormControl = new FormControl('');
  movies: MovieInterface[] = []
  trendingMovies$?: Observable<MovieInterface[]>
  favorites: MovieInterface[] = []
  loading: boolean = true
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: UserInterface | null = null

  constructor(
    private moviesService: MoviesService,
    private userService: UserService,
    private route: Router,
  ) {
  }


  ngOnInit(): void {
    this.getUser()
    this.getPopularMovies()
    this.getFavoriteMovies()
    this.getMovies()

    this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        if (value === '') {
          this.movies = []
        } else {
          this.moviesService.getMovies(value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => {
              this.movies = data
            })
        }
        this.loading = false
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getFavoriteMovies() {
    this.userService.getFavoriteMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        this.favorites = movies
      })
  }

  getPopularMovies() {
    this.trendingMovies$ = this.moviesService.getPopularMovies().pipe(
      takeUntil(this.destroy$),
    )
  }

  getMovies() {
    this.userService.favoritesMovies$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (movies) => {
          this.favorites = movies
        },
      )
  }

  getUser() {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.user = data
      })
  }

  onRedirect(path: string) {
    this.route.navigate([`${path}`])
  }
}
