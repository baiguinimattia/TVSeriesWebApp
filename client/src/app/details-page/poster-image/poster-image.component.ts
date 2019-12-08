import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../data-layer/media.service';
import { PosterSizesEnum, BackdropSizesEnum } from '../../enums/image-enums';

@Component({
  selector: 'app-poster-image',
  templateUrl: './poster-image.component.html',
  styleUrls: ['./poster-image.component.css']
})
export class PosterImageComponent implements OnInit {
  @Input() path: string;
  @Input() name: string;
  imageUrl: string;
  constructor(private readonly mediaService: MediaService) { }

  ngOnInit() {
    this.imageUrl = this.mediaService.getImagePath(this.path, BackdropSizesEnum.original);
  }

  getImagePath(path: string) {
    return this.mediaService.getImagePath(this.path, BackdropSizesEnum.original);
  }

}
