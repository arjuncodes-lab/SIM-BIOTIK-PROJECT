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
  successMessage: string = '';
errorMessage: string = '';


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

  // onSubmit() {
  //   if (this.loginForm.invalid) return;
  //   const { username, password } = this.loginForm.value;
  //   this.loading = true;

  //   this.http
  //     .post<{ accessToken: string }>(
  //       'api/users/login',
  //       { username, password },
  //       { headers: { 'Content-Type': 'application/json' } }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         this.loading = false;
  //         if (res?.accessToken) {
  //           localStorage.setItem('authToken', res.accessToken);
          

  //           this.router.navigate(['/practice-tests']);
  //         } 
  //       },
  //       error: (err) => {
  //         this.loading = false;
         
  //       },
  //     });
  // }


  onSubmit() {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;
  this.loading = true;
  this.successMessage = '';
  this.errorMessage = '';

  this.http
    .post<{ accessToken: string }>(
      'du-test-api.simbiotiktech.in/users/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.accessToken) {
          this.successMessage = 'Login successful! Redirecting...';
          localStorage.setItem('authToken', res.accessToken);        
          setTimeout(() => {
            this.router.navigate(['/practice-tests']);
          }, 1000); // Add slight delay to show the message
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.message||err.message;
      },
    });
}

}
