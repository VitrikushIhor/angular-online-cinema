import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {ProfileInterface} from '../../types/profile.interface';
import {Subject, takeUntil} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  profile!: ProfileInterface
  destroy$: Subject<boolean> = new Subject<boolean>()
  previewImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.subscribe()
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getProfile()
  }

  initializeForm() {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      userName: [''],
      avatar: [''],
    })
  }

  getProfile() {
    this.userService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.profile = data
      })
  }

  uploadPhoto(event: any): void {
    const photoInput = event.target as HTMLInputElement;

    if (photoInput.files && photoInput.files.length > 0) {
      const photoFile = photoInput.files[0];
      this.readAndPreview(photoFile);
    }
  }

  readAndPreview(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.previewImageUrl = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    const {email, password, userName, avatar} = this.form.value
    if (email !== '') {
      this.userService.updateProfile({
        email,
        userName: this.profile.userName,
        password: this.profile.password,
        avatar: this.profile.avatar,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe()
    }
    if (password !== '') {
      this.userService.updateProfile({
        email: this.profile.email,
        userName: this.profile.userName,
        password,
        avatar: this.profile.avatar,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe()
    }
    if (userName !== '') {
      this.userService.updateProfile({
        userName,
        email: this.profile.email,
        avatar: this.profile.avatar,
        password: this.profile.password,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe()
    }
    if (this.previewImageUrl) {
      this.userService.updateProfile({
        userName: this.profile.userName,
        email: this.profile.email,
        avatar: this.previewImageUrl,
        password: this.profile.password,
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        }, err => {
          this.toast.error(err.message)
        })
    }
  }

}
