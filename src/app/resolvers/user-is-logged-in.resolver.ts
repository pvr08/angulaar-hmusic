import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "../services/spotify.service";

export const userIsLoggedInResolver = () => new Promise(async (res, rej) => {
  const spotifyService = inject(SpotifyService);
  const router = inject(Router);

  const notAuthenticated = () => {
    localStorage.clear();
    router.navigateByUrl('/login');
    rej('USER NOT AUTHENTICATED!')
    return false;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return notAuthenticated();
  }
  else{
  
  const userInitialized = await spotifyService.initializeUser();
  console.log(userInitialized);
  if (userInitialized)
    res(true);
  else
    res(notAuthenticated());
  }
  return true;
})
