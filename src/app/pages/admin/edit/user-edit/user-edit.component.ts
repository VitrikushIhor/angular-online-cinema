import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {UserInterface} from '../../../../types/auth.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject();
  user!: UserInterface
  previewImageUrl: string | null = null;
  isAdmin: boolean = false


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
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
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        this.user = data['data']
      })
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.userService.updateUser(this.user._id, {
      userName: this.form.value.userName,
      avatar: this.previewImageUrl || this.user?.avatar,
      password: this.form.value.password,
      email: this.form.value.email,
      isAdmin: this.isAdmin,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
          this.toastrService.success('User updated successfully')
          this.router.navigate(['/admin/statistics'])
        }, () => {
          this.toastrService.error('Error')
        },
      )
  }

  toggleAdmin(): void {
    this.isAdmin = !this.isAdmin;
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
}
