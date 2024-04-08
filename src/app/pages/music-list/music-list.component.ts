import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/Common/factories';
import { ISong } from 'src/app/Interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit, OnDestroy {

  imageUrl = ''; 
  text = '';

  songs: ISong[] = [];
  currentSong: ISong = newSong();
  playIcon = faPlay;

  title = '';

  subs: Subscription[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
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

  getCurrentSong(){
    const sub = this.playerService.currentSong.subscribe(song => {
      this.currentSong = song;
    });

    this.subs.push(sub);
  }

  getMusic(){
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type');
        const id = params.get('id');
        await this.getDataPage(type, id);
      });
    
    this.subs.push(sub);
  }

  async getDataPage(type: string, id: string){
    if(type === 'playlist')
      await this.getPlaylistData(id);
    else
      await this.getArtistData(id);
  }

  async getPlaylistData(playlistId: string){
    const playlistSongs = await this.spotifyService.getPlaylistSongs(playlistId);
    this.setPageData(playlistSongs.name, playlistSongs.imageUrl, playlistSongs.songs);
    this.title = 'Playlist Songs: ' + playlistSongs.name;
  }

  async getArtistData(artistId: string){

  }

  setPageData(bannerText: string, bannerImage: string, songs: ISong[]){
    this.imageUrl = bannerImage;
    this.text = bannerText;
    this.songs = songs;
  }

  getArtists(song: ISong){
    return song.artists.map(artist => artist.name).join(', ');
  }

  async playSong(song: ISong){
    await this.spotifyService.playSong(song.id);
    this.playerService.setCurrentSong(song);
  }

}
