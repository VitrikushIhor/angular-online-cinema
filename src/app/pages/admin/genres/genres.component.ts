import {Component, OnDestroy, OnInit} from '@angular/core';
import {GenreService} from '../../../services/genre/genre.service';
import {concatMap, debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {GenreInterface} from '../../../types/genre.interface';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  isLoading = true
  genres!: GenreInterface[]
  searchQueryControl: FormControl = new FormControl('');
  currentPage: number = 1

  constructor(
    private genreService: GenreService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getGenres()
    this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.genreService.getAllGenres(value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.genres = data
            this.isLoading = false
          })
      });
  }

  getGenres() {
    this.genreService.getAllGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isLoading = false
        this.genres = data
      })
  }

  createGenre() {
    this.genreService.createGenre()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.toastr.success('Genre created successfully')
        this.router.navigate([`admin/create/genre/${data}`])
      }, (e: any) => this.toastr.error(e.message))
  }

  removeGenre(id: any) {
    this.genreService.removeGenre(id)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => this.genreService.getAllGenres()),
      )
      .subscribe((data) => {
        this.genres = data
        this.toastr.success('Genre deleted successfully')
      }, (e) => {
        this.toastr.error(e.message)
      })
  }

  onRedirect(id: any) {
    this.router.navigate([`/admin/edit/genre/${id}`])

  }
}
