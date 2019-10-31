import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  search(title: string): Observable<any> {
    return this.http.get('/api/shows', {
      params: { title }
    });
  }

  searchTv(title: string): Observable<any> {
    return this.http.get('/api/shows/search/tv', {
      params: { query: title }
    });
  }

  getShowById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id);
  }

  getShowEpisodesById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id + '/episodes');
  }
}
