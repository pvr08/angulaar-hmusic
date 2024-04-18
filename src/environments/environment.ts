
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

export const SpotifyConfiguration = {
  clientId: 'a9764733eb644856bca9906179c44358',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  //redirectUrl: 'https://angular-demo-beryl.vercel.app/login', 
  redirectUrl: 'http://localhost:4200/login/',
  clientSecret: 'bf5c7fbf54674aefbc4120170a52b457',
  scopes: [
    "user-read-currently-playing", 
    "user-read-recently-played", 
    "user-read-playback-state", 
    "user-top-read", 
    "user-modify-playback-state", 
    "user-library-read", 
    "playlist-read-private", 
    "playlist-read-collaborative" 
  ],
  MONGODB_URI:"mongodb+srv://vishalgoud2020:VishalKanaka@cluster0.j7jfniz.mongodb.net/Music?retryWrites=true&w=majority"

}

