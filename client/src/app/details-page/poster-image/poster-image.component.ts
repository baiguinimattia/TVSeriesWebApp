import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../data-layer/media.service';
import { PosterSizesEnum } from '../../enums/image-enums';

@Component({
  selector: 'app-poster-image',
  templateUrl: './poster-image.component.html',
  styleUrls: ['./poster-image.component.css']
})
export class PosterImageComponent implements OnInit {
  @Input() path: string;
  @Input() name: string;
  constructor(private readonly mediaService: MediaService) { }

  ngOnInit() {
  }

  getImagePath(path: string) {
    return this.mediaService.getImagePath(this.path, PosterSizesEnum.original);
  }

}
