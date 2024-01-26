import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.authService.register({email: this.form.value.email, password: this.form.value.password})
    this.form.reset()
  }
}
