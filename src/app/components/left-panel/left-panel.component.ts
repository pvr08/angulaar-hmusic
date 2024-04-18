import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch,faHeart,faBell } from '@fortawesome/free-solid-svg-icons';
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
  albumIcon = faMusic;
  playlistIcon = faMusic;
  likedsongIcon = faHeart;
  newreleaseIcon =faBell;
  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  buttonClick(button: string){
    this.selectedMenu = button;
    if(this.selectedMenu==='Home'){
    this.router.navigateByUrl('player/home');
    }
    else if(this.selectedMenu==='LikedSongs'){
      this.router.navigateByUrl('player/mysong');
    }
    else if(this.selectedMenu==='Album'){
      this.router.navigateByUrl('player/album');
    }
    else if(this.selectedMenu==='NewReleases'){
      this.router.navigateByUrl('player/newreleases');
    }
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
