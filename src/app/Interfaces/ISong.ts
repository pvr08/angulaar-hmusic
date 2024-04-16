export interface ISong {
  id: string;
  title: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
  duration: string;
  preview_url: string;
}
