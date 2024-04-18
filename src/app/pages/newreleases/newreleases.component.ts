import { Component } from '@angular/core';
import { IAlbum } from 'src/app/Interfaces/IAlbum';
import { IArtist } from 'src/app/Interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';
interface CardItem {
  images: any[];
  id: string;
  altTitle: string;
  heading: string;
  subheading?: string;
  imageRounded?: boolean;
  type: string;
}
@Component({
  selector: 'app-newreleases',
  templateUrl: './newreleases.component.html',
  styleUrls: ['./newreleases.component.scss']
})
export class NewreleasesComponent {
  topArtists: IArtist[];
  savedAlbums: IAlbum[];
  newReleases: IAlbum[];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loadTopArtists();
    this.loadSavedAlbums();
    this.loadnewReleases();
  }

  async loadTopArtists() {
   
    this.topArtists = await this.spotifyService.getTopArtists();
    console.log(this.topArtists);
  }
  async loadSavedAlbums(){
    this.savedAlbums= await this.spotifyService.getMySavedAlbums();
    console.log(this.savedAlbums);
    
  }
  async loadnewReleases(){
    this.newReleases=await this.spotifyService.getNewReleases();
    console.log(this.newReleases);
  }
  transformAlbumsToCardItems(albums: IAlbum[]): CardItem[] {
    return albums.map(album => ({
      images: album.images.map(image => ({ url: image.url })),
      id: album.id,
      altTitle: album.name,
      heading: album.name,
      type: 'album'
    }));
  }
}
