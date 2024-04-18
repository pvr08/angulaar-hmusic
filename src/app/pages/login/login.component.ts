import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpotifyService } from 'src/app/services/spotify.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private spotifyService: SpotifyService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.checkTokenUrlCallback();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getTokenFromCallbackUrl();
    if (token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        (response: any) => {
          window.location.href = this.spotifyService.getLoginUrl();
          this.router.navigate(['/player/home']);
        },
        (error: any) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
    } else {
      this.errorMessage = 'Please check your entries and try again.';
    }
  }
}