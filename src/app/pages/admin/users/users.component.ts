import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {concatMap, debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {UserInterface} from '../../../types/auth.interface';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  searchQueryControl: FormControl = new FormControl('');
  destroy$: Subject<boolean> = new Subject();
  users: UserInterface[] = []
  isLoading: boolean = true
  currentPage: number = 1

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.getUsers()

    this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.userService.getAllUsers(value)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.users = data
            this.isLoading = false
          })
      });
  }

  getUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data
        this.isLoading = false
      })
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => {
          return this.userService.getAllUsers()
        }),
      )
      .subscribe((data) => {
        this.users = data
      })
  }

  onRedirect(id: string) {
    this.router.navigate([`admin/edit/user/${id}`])
  }
}
