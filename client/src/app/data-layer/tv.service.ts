import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowDetails } from '../interfaces/show-details.interface';
import { ExternalIds } from '../interfaces/external-ids.interface';
import { Credits } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  constructor(private readonly http: HttpClient) { }

  getDetails(id: string): Observable<ShowDetails> {
    return this.http.get<ShowDetails>(`/api/tv/${id}`);
  }

  getExternalIds(id: string): Observable<ExternalIds> {
    return this.http.get<ExternalIds>(`/api/tv/${id}/external_ids`);
  }

  getCredits(id: string): Observable<Credits> {
    return this.http.get<Credits>(`/api/tv/${id}/credits`);
  }
}
