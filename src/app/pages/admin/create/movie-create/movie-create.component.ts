import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionInterface} from '../../../../types/genre.interface';
import {MovieActorInterface, MovieInterface} from '../../../../types/movie.interface';
import {Subject, takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from '../../../../services/movie/movies.service';
import {FileService} from '../../../../services/file/file.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  genres!: CollectionInterface[]
  actors!: MovieActorInterface[]
  form!: FormGroup
  posterPreview: string | ArrayBuffer | null = ''
  bigPosterPreview: string | ArrayBuffer | null = ''
  movie!: MovieInterface

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private movieService: MoviesService,
    private fileService: FileService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getData()
    this.initializeForm()
  }

  getData() {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.genres = data['data'].genres
        this.actors = data['data'].actors
        this.movie = data['data'].movie
      })
  }

  initializeForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      country: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      year: ['', [Validators.required]],
      genres: ['', [Validators.required]],
      actors: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      bigPoster: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]],
    })

  }

  uploadFile(e: any, folder: string, name: string) {
    const files = e.target.files;

    if (files?.length > 0) {
      const formData = new FormData();

      if (name === 'poster') {
        formData.append('image', files[0]);
        this.fileService.updateFile(formData, folder).subscribe((data) => {
          this.form.get('poster')?.patchValue(data[0].url)
        });
      } else if (name === 'bigPoster') {
        formData.append('image', files[0]);
        this.fileService.updateFile(formData, folder).subscribe((data) => {
          this.form.get('bigPoster')?.patchValue(data[0].url)
        });
      } else if (name === 'video') {
        formData.append('image', files[0]);
        this.fileService.updateFile(formData, folder).subscribe((data) => {
          this.form.get('videoUrl')?.patchValue(data[0].url)
        });
      }
    }
  }

  onSubmit() {
    this.movieService.createMovie(this.movie._id,
      {
        ...this.form.value,
        parameters: {
          year: this.form.value.year,
          country: this.form.value.country,
          duration: this.form.value.duration,
        },
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/admin/movies'])
        this.form.reset()
      }, error =>
        this.toastr.error(error.message))
  }
}
