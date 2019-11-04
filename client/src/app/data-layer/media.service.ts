import { Injectable } from '@angular/core';
import { LogoSizesEnum, PosterSizesEnum } from '../enums/image-enums';
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

  getPosterPath(path?: string, dimension?: PosterSizesEnum): Observable<any> {
    const opts = {
      params: new HttpParams({
        fromObject: {
          path: path ? path : '',
          dimension: dimension ? dimension : 'original'
        }
      })
    };
    return this.data.getImage('/api/media/poster', opts);
  }

}
