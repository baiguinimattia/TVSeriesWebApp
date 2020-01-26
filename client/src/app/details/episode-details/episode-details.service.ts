import { Injectable } from '@angular/core';
import { TvService } from 'src/app/data-layer/tv.service';
import { Observable } from 'rxjs';
import { EpisodeDetailed } from 'src/app/interfaces/season.interface';
import { MediaService } from 'src/app/data-layer/media.service';
import { StillSizesEnum } from 'src/app/enums/image-enums';
import { EpisodeImages } from 'src/app/interfaces/episode-interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailsService {

  constructor(private readonly tvSrv: TvService, private mediaSrv: MediaService) { }

  getEpisode(id: string, sno: number, eno: number): Observable<EpisodeDetailed> {
    return this.tvSrv.getEpisode(id, sno, eno);
  }

  getEpisodesImages(id: string, sno: number, eno: number): Observable<EpisodeImages> {
    return this.tvSrv.getEpisodesImages(id, sno, eno);
  }

  getStillPath(path: string, dimension: StillSizesEnum) {
    return this.mediaSrv.getStillImage(path, dimension);
  }
}
