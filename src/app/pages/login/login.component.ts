import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  onSubmit() {
    this.authService.login({email: this.form.value.email, password: this.form.value.password})
    this.form.reset()
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

}

