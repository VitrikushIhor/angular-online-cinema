import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {MovieInterface} from '../../types/movie.interface';
import {mergeMap, Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favorites: MovieInterface[] = []
  isLoading: boolean = true
  destroy$: Subject<boolean> = new Subject<boolean>()
  isSmashed: boolean = false
  favoritesIds = new Set<string>([])

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.initializeMovies()
    this.getFavoriteMovies()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.subscribe()
  }

  initializeMovies() {
    this.userService.favoritesMovies$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.favorites = data
        this.isLoading = false
      })
  }

  getFavoriteMovies() {
    this.userService.getFavoriteMovies()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (favoriteMovies) => {
          this.favoritesIds = new Set(favoriteMovies.map((item) => item._id));
        },
      );
  }

  toggleFavorite(movieId: string): void {
    this.userService.toggleFavorite(movieId).pipe(
      takeUntil(this.destroy$),
      mergeMap(() => this.userService.getFavoriteMovies()),
      tap((movies) => {
        this.userService.favoritesMovies$.next(movies);
      }),
    ).subscribe(
      () => {
        this.isSmashed = !this.isSmashed;
      },
    );
  }

}
