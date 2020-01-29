import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowDetails } from '../interfaces/show-details.interface';
import { ExternalIds } from '../interfaces/external-ids.interface';
import { Credits } from '../interfaces/person.interface';
import { ContentRating } from '../interfaces/content-rating.interface';
import { ImdbDetails } from '../interfaces/imdb-details.interface';
import { SeasonDetailed, EpisodeDetailed } from '../interfaces/season.interface';
import { ShowResult } from '../interfaces/show-result.interface';
import { EpisodeImages } from '../interfaces/episode-interface';
import { MainState } from '../state/state/main.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { tap } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { Popular } from '../interfaces/popular.interface';

@Injectable({
  providedIn: 'root'
})
export class TvService {
  @Emitter(MainState.addId)
  public visits: Emittable<Array<string>>;
  @Select(MainState.visits) visits$: Observable<Array<string>>; 
  ids: Array<string> = new Array<string>();

  constructor(private readonly http: HttpClient) { 
    this.visits$.subscribe(
      (response) => {
        this.ids = response;
      }
    );
  }

  getDetails(id: string): Observable<ShowDetails> {
    return this.http.get<ShowDetails>(`/api/tv/${id}`).pipe(
      tap( () => {
        this.ids.push(id);
        this.visits.emit(this.ids);
      } ),
    );
  }

  getExternalIds(id: string): Observable<ExternalIds> {
    return this.http.get<ExternalIds>(`/api/tv/${id}/external_ids`);
  }

  getCredits(id: string): Observable<Credits> {
    return this.http.get<Credits>(`/api/tv/${id}/credits`);
  }

  getContentRating(id: string): Observable<{ results: ContentRating[], id: string }> {
    return this.http.get<{ results: ContentRating[], id: string }>(`/api/tv/${id}/content_rating`);
  }

  getImdb(id: string): Observable<ImdbDetails> {
    return this.http.get<ImdbDetails>(`/api/tv/${id}/imdb`);
  }

  getEpisodesBySeasonNo(id: string, no: number): Observable<SeasonDetailed> {
    return this.http.get<SeasonDetailed>(`/api/tv/${id}/season/${no}`);
  }

  getRecommendations(id: string) {
    return this.http.get<ShowResult[]>(`/api/tv/${id}/recommendations`);
  }

  getEpisode(id: string, sno: number, eno: number) {
    return this.http.get<EpisodeDetailed>(`/api/tv/${id}/season/${sno}/episode/${eno}`);
  }

  getEpisodesImages(id: string, sno: number, eno: number): Observable<EpisodeImages> {
    return this.http.get<EpisodeImages>(`/api/tv/${id}/season/${sno}/episode/${eno}/images`);
  }

  getPopular() {
    return this.http.get<Popular>('api/tv/popular');
  }

  getTopRated() {
    return this.http.get<Popular>('/api/tv/top_rated');
  }
}
