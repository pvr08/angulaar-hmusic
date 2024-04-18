import { Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { MusicListComponent } from "../music-list/music-list.component";
import { PlayerComponent } from "./player.component";
import { AlbumComponent } from "../album/album.component";
import { MysongComponent } from "../mysong/mysong.component";
import { NewreleasesComponent } from "../newreleases/newreleases.component";

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list/:type/:id',
        component: MusicListComponent
      },
      {
        path: 'album',
        component:AlbumComponent
      },
      {
        path: 'mysong',
        component:MysongComponent
      },
      {
        path: 'newreleases',
        component:NewreleasesComponent
      }
    ]
  }
]