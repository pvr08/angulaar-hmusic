
export const environment = {
  production: false
};

export const SpotifyConfiguration = {
  clientId: 'a9764733eb644856bca9906179c44358',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://angular-demo-9ymwf81w9-vishals-projects-a93bf41d.vercel.app/login/',
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
  ]
}

