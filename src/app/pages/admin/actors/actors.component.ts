import {Component, OnDestroy, OnInit} from '@angular/core';
import {concatMap, debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {InterfaceActor} from '../../../types/actor.types';
import {Router} from '@angular/router';
import {ActorService} from '../../../services/actor/actor.service';
import {FormControl} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  actors: InterfaceActor[] = []
  isLoading: boolean = true
  searchQueryControl: FormControl = new FormControl('');
  currentPage: number = 1


  constructor(
    private router: Router,
    private actorService: ActorService,
    private toastr: ToastrService,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getActors()

    this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.actorService.getAllActors(value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.actors = data
            this.isLoading = false
          })
      });
  }

  getActors() {
    this.actorService.getAllActors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.actors = data
        this.isLoading = false
      })
  }

  onRedirect(id: string) {
    this.router.navigate([`/admin/edit/actor/${id}`])
  }

  removeActor(id: string) {
    this.actorService.deleteActorById(id)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => this.actorService.getAllActors()),
      )
      .subscribe((data) => {
        this.actors = data
        this.toastr.success('Actor deleted successfully')
      }, (e) => {
        this.toastr.error(e.message)
      })

  }

  createActor() {
    this.actorService.createActor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.toastr.success('Actor created successfully')
        this.router.navigate([`admin/create/actor/${data}`])
      }, (e: any) => this.toastr.error(e.message))
  }
}
