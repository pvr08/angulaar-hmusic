import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkTokenUrlCallback();
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getTokenFromCallbackUrl();
    
    if (!!token) {
      this.spotifyService.setAccessToken(token);
      console.log(token);
      this.router.navigate(['/player/home']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
    //console.log(this.spotifyService.getLoginUrl());
  }
}