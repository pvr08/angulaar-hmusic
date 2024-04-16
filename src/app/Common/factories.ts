import { IArtist } from "../Interfaces/IArtist";
import { ISong } from "../Interfaces/ISong";
import { IPlaylist } from "../Interfaces/IPlaylist";

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    songs: []
  };
}

export function newSong(): ISong {
  return {
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    duration: '',
    title: '',
    preview_url:''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    songs: []
  }
}
