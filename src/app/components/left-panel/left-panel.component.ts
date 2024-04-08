import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  selectedMenu = 'Home';

  playlists: IPlaylist[] = [];

  
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  buttonClick(button: string){
    this.selectedMenu = button;
    this.router.navigateByUrl('player/home');
  }

  goToPlaylist(playlistId: string){
    this.selectedMenu = playlistId;
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`)
  }

  async fetchPlaylists(){
    this.playlists = await this.spotifyService.getUserPlaylists();
    console.log(this.playlists);
  }
}
