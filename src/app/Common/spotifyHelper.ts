import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../Interfaces/IArtist";
import { ISong } from "../Interfaces/ISong";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUser } from "../Interfaces/IUser";
import { newSong, newPlaylist } from "./factories";
import { IAlbum } from "../Interfaces/IAlbum"; 

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
      imageUrl: 'defaultImageUrlHere', 
      songs: []
    };

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images[0].url, 
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
      imageUrl: spotifyTrack.album.images[0].url, 
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    duration: msToMinutes(spotifyTrack.duration_ms),
    preview_url: spotifyTrack.preview_url
  }

  

}

export function SpotifySingleAlbumToAlbum(album: SpotifyApi.SingleAlbumResponse): IAlbum {
  if (!album || !album.images || album.images.length === 0)
    return {
      id: album.id,
      name: album.name,
      artists: album.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      })),
      images: [], 
      album_type: album.album_type,
      release_date: album.release_date,
      tracks: {
        total: album.tracks.total,
        items: [] 
      }
      
    };

  return {
    id: album.id,
    name: album.name,
    artists: album.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    images: [],
    album_type: album.album_type,
    release_date: album.release_date,
    tracks: {
      total: album.tracks.total,
      items: [] 
    }
    
  };
}
export function SpotifyArtistToArtist2(spotifyArtist: SpotifyApi.ArtistObjectSimplified): IArtist {
  return {
    id: spotifyArtist.id,
    name: spotifyArtist.name,
    imageUrl: '' 
  };
}
export function SpotifyAlbumToAlbum(album: SpotifyApi.AlbumObjectFull): IAlbum {
  const artists: IArtist[] = album.artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    imageUrl: null 
  }));

  const images = album.images.map(image => ({
    url: image.url,
    height: image.height,
    width: image.width
  }));

  return {
    id: album.id,
    name: album.name,
    artists: artists,
    images: images,
    album_type: album.album_type,
    release_date: album.release_date
  };
}