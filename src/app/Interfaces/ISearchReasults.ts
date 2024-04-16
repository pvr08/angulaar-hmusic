import { ISong } from "./ISong";
import { IArtist } from "./IArtist";
import {IAlbum} from "./IAlbum";
import { IPlaylist } from "./IPlaylist";
export interface SearchResults {
    albums?: {
      items: IAlbum[];
    };
    artists?: {
      items: IArtist[];
    };
    playlists?: {
      items: IPlaylist[];
    };
    tracks?: {
      items: ISong[];
    };
  }