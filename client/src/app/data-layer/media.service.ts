import { Injectable } from '@angular/core';
import { LogoSizesEnum, PosterSizesEnum, PathsEnum } from '../enums/image-enums';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataLayerService } from './data-layer.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private readonly http: HttpClient, private readonly data: DataLayerService) { }

  getLogoPath(path: string, dimension: LogoSizesEnum) {
    return this.http.get('/api/media/logo', { params: {
      path,
      dimension,
    }});
  }

  getImagePath(path?: string, dimension?: PosterSizesEnum): string {
    return PathsEnum.default + PosterSizesEnum.original + path;

  }

}
