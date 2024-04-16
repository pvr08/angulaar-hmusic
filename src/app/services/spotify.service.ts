import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from 'src/environments/environment';
import { SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifySinglePlaylistToPlaylist, SpotifyTrackToSong, SpotifyUserToUser ,SpotifySingleAlbumToAlbum, SpotifyArtistToArtist2, SpotifyAlbumToAlbum} from '../Common/spotifyHelper';
import { IArtist } from '../Interfaces/IArtist';
import { ISong } from '../Interfaces/ISong';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUser } from '../Interfaces/IUser';
import { IAlbum } from '../Interfaces/IAlbum';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if (!!this.user)
      return true;

    const token = localStorage.getItem('token');
    console.log(token);
    if (!token)
      return false;

      try {
        await this.getSpotifyUser(); 
        console.log(!!this.user);
        return !!this.user;
      } catch (ex) {
        
        return false;
      }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    console.log(userInfo);
    this.user = SpotifyUserToUser(userInfo);

    console.log(this.user);
    
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    //const clientSecret = `client_secret=${SpotifyConfiguration.clientSecret}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenFromCallbackUrl() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    try {
      this.spotifyApi.setAccessToken(token);
      localStorage.setItem('token', token);
      console.log("Session created");
    } catch (error) {
      console.error("Error setting access token:", error);
    }
  }
  

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    console.log(playlists);
    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }
 
  async getPlaylistSongs(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistToPlaylist(playlistSpotify);

    const songsSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.songs = songsSpotify.items.map(song => SpotifyTrackToSong(song.track as SpotifyApi.TrackObjectFull))

    return playlist;
  }

  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToArtist);
  }

  async getSavedSongs(offset = 0, limit = 50): Promise<ISong[]> {
    const songs = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return songs.items.map(x => SpotifyTrackToSong(x.track));
  }
  async getMySavedAlbums(): Promise<IAlbum[]> {
    try {
      const savedAlbumsResponse = await this.spotifyApi.getMySavedAlbums();
      
      if (!savedAlbumsResponse || !savedAlbumsResponse.items ) {
        return [];
      }

      const savedAlbums = savedAlbumsResponse.items;
      const albums: IAlbum[] = savedAlbums.map(savedAlbum => SpotifyAlbumToAlbum(savedAlbum.album));
      
      return albums;
    } catch (error) {
      console.error('Error retrieving saved albums:', error);
      return [];
    }
  }

  async playSong(songid: string) {
    //await this.spotifyApi.play(this.getCurrentSong);
    //await this.spotifyApi.queue(songId);
    await this.spotifyApi.play();
    await this.spotifyApi.skipToNext();
  }

  async getCurrentSong(): Promise<ISong> {
    const currentSongSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
     //await this.spotifyApi.play();
    return SpotifyTrackToSong(currentSongSpotify.item);
  }

  async previousSong() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextSong() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  async getAlbum(albumId: string): Promise<IAlbum> {
    const albumSpotify = await this.spotifyApi.getAlbum(albumId);

    if (!albumSpotify)
      return null;

    return {
      id: albumSpotify.id,
      name: albumSpotify.name,
      artists: albumSpotify.artists,
      images: albumSpotify.images,
      album_type: albumSpotify.album_type,
      release_date: albumSpotify.release_date
    };
  }

  async getAlbumTracks(albumId: string, offset = 0, limit = 50): Promise<ISong[]> {
    const albumSpotify= await this.spotifyApi.getAlbum(albumId)
    const albumTracksSpotify = await this.spotifyApi.getAlbumTracks(albumId, { offset, limit });

    if (!albumTracksSpotify)
      return null;
    const album = SpotifySingleAlbumToAlbum(albumSpotify);

    album.tracks.items= albumTracksSpotify.items.map(song => SpotifyTrackToSong(song as SpotifyApi.TrackObjectFull));
    return album.tracks.items;
  }

  async getAlbums(albumIds: string[]): Promise<IAlbum[]> {
    const albumsSpotify = await this.spotifyApi.getAlbums(albumIds);

    if (!albumsSpotify || !albumsSpotify.albums || albumsSpotify.albums.length === 0)
      return null;

    return albumsSpotify.albums.map(album => ({
      id: album.id,
      name: album.name,
      artists: album.artists.map(SpotifyArtistToArtist2),
      images: album.images,
      album_type: album.album_type,
      release_date: album.release_date
    }));
  }
}
