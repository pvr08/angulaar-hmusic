import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward,faPause } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/Common/factories';
import { ISong } from 'src/app/Interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  music: ISong = newSong();
  subs: Subscription[] = [];
  song: ISong = newSong();
  // Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  pauseIcon = faPause;

  constructor(private playerService: PlayerService, private spotifyservice: SpotifyService) { }
  
  ngOnInit(): void {
    this.getPlayingMusic();
    this.getCurrentSong(); 
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getPlayingMusic(): void {
    const sub = this.playerService.currentSong.subscribe(music => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  async getCurrentSong(): Promise<void> {
    try {
      const song = await this.spotifyservice.getCurrentSong();
      this.music = song;
    } catch (error) {
      console.error('Error getting current song:', error);
    }
  }
  

  goBack(): void {
    this.playerService.previousSong();
  }

  goNext(): void {
    this.playerService.nextSong();
  }
  pause(): void{
    this.spotifyservice.pauseSong();
  }
}
