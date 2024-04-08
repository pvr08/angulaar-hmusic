import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/Common/factories';
import { ISong } from 'src/app/Interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  songs: ISong[] = [];
  currentSong: ISong = newSong();

  subs: Subscription[] = [];

  
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getMusic();
    this.getCurrentSong();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMusic() {
    this.songs = await this.spotifyService.getSavedSongs();
  }

  getCurrentSong(){
    const sub = this.playerService.currentSong.subscribe(song => {
      this.currentSong = song;
    });

    this.subs.push(sub);
  }

  getArtists(song: ISong){
    return song.artists.map(artist => artist.name).join(', ');
  }

  async playSong(song: ISong){
    await this.spotifyService.playSong(song.id);
    this.playerService.setCurrentSong(song);
  }
}
