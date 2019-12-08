import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/data-layer/media.service';
import { PosterSizesEnum } from 'src/app/enums/image-enums';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() path: string;
  imageUrl: string;
  constructor(private readonly mediaService: MediaService) { }

  ngOnInit() {
    this.imageUrl = this.mediaService.getImagePath(this.path, PosterSizesEnum.original);
  }

  getImagePath(path: string) {
    return this.mediaService.getImagePath(this.path, PosterSizesEnum.original);
  }

}
