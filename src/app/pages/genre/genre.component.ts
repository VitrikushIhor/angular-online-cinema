import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieGenreInterface, MovieInterface} from '../../types/movie.interface';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit, OnDestroy {
  movies: MovieInterface[] = []
  genre!: MovieGenreInterface
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getData()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }


  getData() {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.movies = data['data'].movies
        this.genre = data['data'].genre
      });
  }

}
