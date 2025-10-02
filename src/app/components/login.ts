import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.loading = true;

    this.http
      .post<{ accessToken: string }>(
        'api/users/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res?.accessToken) {
            localStorage.setItem('authToken', res.accessToken);
          

            this.router.navigate(['/practice-tests']);
          } 
        },
        error: (err) => {
          this.loading = false;
         
        },
      });
  }
}
