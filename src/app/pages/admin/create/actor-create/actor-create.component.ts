import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {InterfaceActor} from '../../../../types/actor.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileService} from '../../../../services/file/file.service';
import {ActorService} from '../../../../services/actor/actor.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.scss'],
})
export class ActorCreateComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  actor!: InterfaceActor
  form!: FormGroup
  photoPreview: null | string = null

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private fileService: FileService,
    private actorService: ActorService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getData()
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.fb.group({
      slug: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    })
  }


  getData() {
    this.route.data
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.actor = data['data']
      })
  }

  uploadFile(e: any, folder: string, name: string) {
    const files = e.target.files;

    if (files?.length > 0) {
      const formData = new FormData();
      formData.append('image', files[0]);
      this.fileService.updateFile(formData, folder).subscribe((data) => {
        this.photoPreview = data[0].url
        this.form.get('photo')?.patchValue(data[0].url)
      });
    }
  }

  onSubmit() {
    this.actorService.updateActor(this.actor._id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/admin/actors'])
        this.form.reset()
      }, error =>
        this.toastr.error(error.message))
  }
}
