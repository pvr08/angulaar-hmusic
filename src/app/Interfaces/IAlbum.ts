import { IArtist } from "./IArtist";
import { ISong } from "./ISong";

export interface IAlbum {
  id: string;
  name: string;
  artists: IArtist[];
  images?: ImageObject[]; 
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: ISong[];
  };
}

interface ImageObject {
  height?: number | null;
  url?: string | null;
  width?: number | null;
}
