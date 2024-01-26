import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieInterface} from '../../../../types/movie.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenreService} from '../../../../services/genre/genre.service';
import {ActorService} from '../../../../services/actor/actor.service';
import {CollectionInterface} from '../../../../types/genre.interface';
import {InterfaceActor} from '../../../../types/actor.types';
import {ToastrService} from 'ngx-toastr';
import {MoviesService} from '../../../../services/movie/movies.service';
import {FileService} from '../../../../services/file/file.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss'],
})
export class MovieEditComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  movie!: MovieInterface
  form!: FormGroup;
  genres!: CollectionInterface[]
  actors!: InterfaceActor[]

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private actorService: ActorService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private movieService: MoviesService,
    private router: Router,
    private fileService: FileService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getData()
    this.getGenres()
    this.getActors()
    this.initializeForm()
  }

  getActors() {
    this.actorService.getAllActors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.actors = data
      })
  }

  getGenres() {
    this.genreService.getCollections()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.genres = data
      })
  }

  getData() {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        this.movie = data['data']
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      title: [this.movie.title, [Validators.required]],
      slug: [this.movie.slug, [Validators.required]],
      country: [this.movie.parameters.country, [Validators.required]],
      duration: [this.movie.parameters.duration, [Validators.required]],
      year: [this.movie.parameters.year, [Validators.required]],
      genres: [this.movie.genres.map(genre => genre), [Validators.required]],
      actors: [this.movie.actors.map(actor => actor), [Validators.required]],
      poster: [this.movie.poster, [Validators.required]],
      bigPoster: [this.movie.bigPoster, [Validators.required]],
      videoUrl: [this.movie.videoUrl, [Validators.required]],
    })
  }

  uploadFile($event: any, folder: string, name: string) {
    const files = $event.target.files;

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
        this.toast.success('Movie was successfully updated!')
        this.form.reset()
      }, error =>
        this.toast.error(error.message))
  }
}
