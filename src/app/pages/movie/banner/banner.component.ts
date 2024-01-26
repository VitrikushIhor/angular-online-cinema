import {Component, Input, OnInit} from '@angular/core';
import {MovieInterface} from '../../../types/movie.interface';
import {UserInterface} from '../../../types/auth.interface';
import {mergeMap, Subject, takeUntil, tap} from 'rxjs';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() movie!: MovieInterface
  user: UserInterface | null = null
  isSmashed: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getUser()
    this.getFavoriteMovies()

  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.subscribe()
  }

  getUser() {
    this.user = this.userService.user$.getValue()
  }

  getFavoriteMovies() {
    this.userService.getFavoriteMovies()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (favoriteMovies) => {
          const isHasMovie = favoriteMovies.some((favorite) => favorite._id === this.movie._id);
          if (this.isSmashed !== isHasMovie) {
            this.isSmashed = isHasMovie;
          }
        },
      );
  }

  toggleFavorite(): void {
    this.userService.toggleFavorite(this.movie._id).pipe(
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
