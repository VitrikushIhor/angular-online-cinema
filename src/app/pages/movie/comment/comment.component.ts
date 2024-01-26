import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MoviesService} from '../../../services/movie/movies.service';
import {CommentInterface} from '../../../types/comment.interface';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovieInterface} from '../../../types/movie.interface';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {UserInterface} from '../../../types/auth.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() movie!: MovieInterface

  comments: CommentInterface[] = []
  isLoading: boolean = true
  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: UserInterface | null = null

  constructor(
    private movieService: MoviesService,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getUser()
    this.getComments()
    this.initializeForm()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUser() {
    this.user = this.userService.user$.getValue()
  }

  getComments() {
    this.movieService.getComments(this.movie._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.comments = data
        this.isLoading = false
      })
  }

  deleteComment(commentId: string) {
    this.movieService.deleteComment(commentId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.movieService.getComments(this.movie._id);
        }),
      )
      .subscribe((data) => {
        this.comments = data;
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      text: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.movieService.createComment({message: this.form.value.text, movieId: this.movie._id})
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.movieService.getComments(this.movie._id);
        }),
      )
      .subscribe((data) => {
        this.comments = data;
        this.form.reset()
      });
  }
}
