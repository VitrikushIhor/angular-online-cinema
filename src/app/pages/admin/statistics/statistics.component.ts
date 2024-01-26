import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Subject, takeUntil} from 'rxjs';
import {MoviesService} from '../../../services/movie/movies.service';
import {MovieInterface} from '../../../types/movie.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  countUsers: number = 0
  popularMovie!: MovieInterface
  isLoading: boolean = true

  constructor(
    private userService: UserService,
    private moviesService: MoviesService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.subscribe()
  }

  ngOnInit(): void {
    this.getUsers()
    this.getMovies()
  }

  getMovies() {
    this.moviesService.getPopularMovies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.popularMovie = data[0]
        this.isLoading = false
      })
  }

  getUsers() {
    this.userService.getCountUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.countUsers = data
        this.isLoading = false
      })
  }

}
