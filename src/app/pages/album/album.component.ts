import { Component ,OnDestroy, OnInit} from '@angular/core';
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
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  topArtists: IArtist[];
  savedAlbums: IAlbum[];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.loadTopArtists();
    this.loadSavedAlbums();
  }

  async loadTopArtists() {
   
    this.topArtists = await this.spotifyService.getTopArtists();
    console.log(this.topArtists);
  }
  async loadSavedAlbums(){
    this.savedAlbums= await this.spotifyService.getMySavedAlbums();
    console.log(this.savedAlbums);
    
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
