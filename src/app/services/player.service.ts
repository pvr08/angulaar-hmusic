import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newSong } from '../Common/factories';
import { ISong } from '../Interfaces/ISong';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = new BehaviorSubject<ISong>(newSong());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentSong();
  }

  async getCurrentSong(){
    clearTimeout(this.timerId);

    // Get the current song
    const song = await this.spotifyService.getCurrentSong();
    this.setCurrentSong(song);

    // Loop
    this.timerId = setInterval(async () => {
      await this.getCurrentSong();
    }, 5000)
  }

  setCurrentSong(song: ISong){
    this.currentSong.next(song);
  }

  async previousSong(){
    await this.spotifyService.previousSong();
  }

  async nextSong() {
    await this.spotifyService.nextSong();
  }
}
