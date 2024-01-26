import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {MovieActorInterface, MovieInterface} from '../../types/movie.interface';
import {ActivatedRoute} from '@angular/router';
import {MoviesService} from '../../services/movie/movies.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
})
export class ActorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = true;
  actor!: MovieActorInterface
  movies!: MovieInterface[]

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getData()
    this.getMovies()
  }

  getData() {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        this.actor = data['data']
        this.isLoading = false
      });
  }

  getMovies() {
    this.movieService.getByActor(this.actor._id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.movies = data
        this.isLoading = false
      })
  }

}
