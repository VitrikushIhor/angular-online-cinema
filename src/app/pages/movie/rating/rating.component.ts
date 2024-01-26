import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '../../../types/auth.interface';
import {RatingService} from '../../../services/rating/rating.service';
import {Subject, takeUntil} from 'rxjs';
import {RedirectService} from '../../../services/redirect/redirect.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnDestroy {
  @Input() movieId: string = ''
  @Input() slug: string = ''

  user: UserInterface | null = null
  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ratingService: RatingService,
    private redirectService: RedirectService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getUser()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  getUser() {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.user = data
      })
  }

  initializeForm() {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  setRating() {
    if (this.form.value.rating !== '') {
      this.ratingService.setRating(this.movieId, this.form.value.rating)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe()
    }
  }

  onRedirect(slug: string) {
    this.redirectService.setRedirectUrl(`/movie/${slug}`);
    this.router.navigate(['/login']);
  }

}
