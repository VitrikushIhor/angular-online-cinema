import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenreService} from '../../services/genre/genre.service';
import {GenreInterface} from '../../types/genre.interface';
import {UserInterface} from '../../types/auth.interface';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  genres: GenreInterface[] = []
  user: UserInterface | null = null
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private genreService: GenreService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getGenres()
    this.getUser()
  }

  getUser() {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.user = data
      })
  }

  getGenres() {
    this.genreService.getPopularGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.genres = data
        this.isLoading = false
      })
  }

  logout() {
    this.authService.logout()
  }
}
