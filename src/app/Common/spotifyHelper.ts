import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../Interfaces/IArtist";
import { ISong } from "../Interfaces/ISong";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUser } from "../Interfaces/IUser";
import { newSong, newPlaylist } from "./factories";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  
  const imageUrl = user.images.length > 0 ? user.images[user.images.length - 1].url : null;

  return {
    id: user.id,
    name: user.display_name || 'No Name',
    imageUrl: imageUrl 
  }
}


export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images.pop().url : 'defaultImageUrlHere';

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: imageUrl, 
  };
}


export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    songs: []
  }
}

export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url,
    name: spotifyArtist.name
  };
}

export function SpotifyTrackToSong(spotifyTrack: SpotifyApi.TrackObjectFull): ISong {
  if (!spotifyTrack)
    return newSong();

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  }

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    duration: msToMinutes(spotifyTrack.duration_ms),
  }
}
