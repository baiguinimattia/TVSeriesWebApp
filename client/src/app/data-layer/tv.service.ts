import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowDetails } from '../interfaces/show-details.interface';
import { ExternalIds } from '../interfaces/external-ids.interface';

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
}
