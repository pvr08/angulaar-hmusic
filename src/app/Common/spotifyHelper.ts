import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../Interfaces/IArtist";
import { ISong } from "../Interfaces/ISong";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUser } from "../Interfaces/IUser";
import { newSong, newPlaylist } from "./factories";

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  // Safely access the last image's URL, if available
  const imageUrl = user.images.length > 0 ? user.images[user.images.length - 1].url : null;

  return {
    id: user.id,
    name: user.display_name || 'No Name', // Provide a fallback in case display_name is not set
    imageUrl: imageUrl // This could be null if no images are available
  }
}


export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  // Check if 'images' is not null and has at least one element
  const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images.pop().url : 'defaultImageUrlHere';

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: imageUrl, // Use the imageUrl from above, with a fallback if necessary
  };
}


// export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
//   if (!playlist)
//     return newPlaylist();

//   return {
//     id: playlist.id,
//     name: playlist.name,
//     imageUrl: playlist.images.shift().url,
//     songs: []
//   }
// }

// export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
//   return {
//     id: spotifyArtist.id,
//     imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url,
//     name: spotifyArtist.name
//   };
// }

// export function SpotifyTrackToSong(spotifyTrack: SpotifyApi.TrackObjectFull): ISong {
//   if (!spotifyTrack)
//     return newSong();

//   const msToMinutes = (ms: number) => {
//     const date = addMilliseconds(new Date(0), ms);
//     return format(date, 'mm:ss');
//   }

//   return {
//     id: spotifyTrack.uri,
//     title: spotifyTrack.name,
//     album: {
//       id: spotifyTrack.id,
//       imageUrl: spotifyTrack.album.images.shift().url,
//       name: spotifyTrack.album.name
//     },
//     artists: spotifyTrack.artists.map(artist => ({
//       id: artist.id,
//       name: artist.name
//     })),
//     duration: msToMinutes(spotifyTrack.duration_ms),
//   }
// }
export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if (!playlist || !playlist.images || playlist.images.length === 0)
    return {
      id: playlist.id,
      name: playlist.name,
      imageUrl: 'defaultImageUrlHere', // Fallback if playlist images are not available
      songs: []
    };

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images[0].url, // Use the first image URL if available
    songs: []
  };
}

export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images && spotifyArtist.images.length > 0 ? spotifyArtist.images.pop().url : 'defaultImageUrlHere', // Fallback if artist images are not available
    name: spotifyArtist.name
  };
}

export function SpotifyTrackToSong(spotifyTrack: SpotifyApi.TrackObjectFull): ISong {
  if (!spotifyTrack || !spotifyTrack.album || !spotifyTrack.album.images || spotifyTrack.album.images.length === 0)
    return newSong();

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  }

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.album.id,
      imageUrl: spotifyTrack.album.images[0].url, // Use the first album image URL if available
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    duration: msToMinutes(spotifyTrack.duration_ms),
  }
}
