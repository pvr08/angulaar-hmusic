import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newSong } from 'src/app/Common/factories';
import { ISong } from 'src/app/Interfaces/ISong';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  music: ISong = newSong();
  subs: Subscription[] = [];

  // Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayingMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getPlayingMusic(): void {
    const sub = this.playerService.currentSong.subscribe(music => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  goBack(): void {
    this.playerService.previousSong();
  }

  goNext(): void {
    this.playerService.nextSong();
  }

}
