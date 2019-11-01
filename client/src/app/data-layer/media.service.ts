import { Injectable } from '@angular/core';
import { LogoSizesEnum, PosterSizesEnum } from '../enums/image-enums';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private readonly http: HttpClient) { }

  getLogoPath(path: string, dimension: LogoSizesEnum) {
    return this.http.get('/api/media/logo', { params: {
      path,
      dimension,
    }});
  }

  getPosterPath(path: string, dimension: PosterSizesEnum): Observable<any> {
    return this.http.get('/api/media/poster', { params: {
      path,
      dimension,
    }});
  }
}
