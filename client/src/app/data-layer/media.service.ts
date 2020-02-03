import { Injectable } from '@angular/core';
import { LogoSizesEnum, PosterSizesEnum, PathsEnum, StillSizesEnum, BackdropSizesEnum } from '../enums/image-enums';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataLayerService } from './data-layer.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private readonly http: HttpClient, private readonly data: DataLayerService) { }

  getImagePath(path?: string, dimension?: string): string {
    return PathsEnum.secured + PosterSizesEnum.original + path;

  }

  getStillImage(path: string, dimension: StillSizesEnum): string {
    return `${PathsEnum.secured}${dimension}${path}`;
  }

  getBackdropImage(path: string, dimension: BackdropSizesEnum): string {
    return `${PathsEnum.secured}${dimension}${path}`;
  }

  getPosterImage(path: string, dimension: PosterSizesEnum): string {
    return `${PathsEnum.secured}${dimension}${path}`;
  }
}
