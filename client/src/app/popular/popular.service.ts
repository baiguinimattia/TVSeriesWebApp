import { Injectable } from '@angular/core';
import { TvService } from '../data-layer/tv.service';
import { MediaService } from '../data-layer/media.service';
import { BackdropSizesEnum } from '../enums/image-enums';

@Injectable({
  providedIn: 'root'
})
export class PopularService {

  constructor(private readonly tvService: TvService, private readonly mediaSrv: MediaService) { }

  getPopular() {
    return this.tvService.getPopular();
  }
  getBackgroundUrl(path: string, dimension: BackdropSizesEnum): string {
    return `url(${this.mediaSrv.getBackdropImage(path, dimension)}) top center/cover no-repeat`;
  }
}
