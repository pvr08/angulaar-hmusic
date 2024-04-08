import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artist-image-item',
  templateUrl: './artist-image-item.component.html',
  styleUrls: ['./artist-image-item.component.scss']
})
export class ArtistImageItemComponent implements OnInit {

  @Input()
  imageSrc = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }

}
