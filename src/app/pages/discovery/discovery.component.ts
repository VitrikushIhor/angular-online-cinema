import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenreService} from '../../services/genre/genre.service';
import {Subject, takeUntil} from 'rxjs';
import {CollectionInterface} from '../../types/genre.interface';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
})
export class DiscoveryComponent implements OnInit, OnDestroy {
  genres: CollectionInterface[] = []
  isLoading: boolean = true
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private genreService: GenreService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getGenres()
  }

  getGenres() {
    this.genreService.getCollections()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.genres = data
      }, (error) => {
        this.isLoading = false
      }, () => {
        this.isLoading = false
      })
  }

}
