import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GenreService} from '../../../../services/genre/genre.service';
import {Subject, takeUntil} from 'rxjs';
import {GenreInterface} from '../../../../types/genre.interface';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.scss'],
})
export class GenreCreateComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  genre!: GenreInterface
  form!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private genreService: GenreService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
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
        this.genre = data['data']
      })
  }

  initializeForm() {
    this.form = this.fb.group({
      slug: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      icon: [''],
    })
  }

  onSubmit() {
    this.genreService.updateGenre(this.genre._id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/admin/genres'])
        this.form.reset()
      }, error =>
        this.toastr.error(error.message))
  }

}
