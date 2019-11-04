import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    return this.http.get('/api/tv/search', {
      params: { query: title }
    });
  }

  getShowById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id);
  }

  getShowEpisodesById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id + '/episodes');
  }


  getImage(imageUrl: string, options?: {
    params?: HttpParams
  }): Observable<Blob> {
    const path = options !== undefined ? options.params.get('path') : '';
    const dimension = options !== undefined ? options.params.get('dimension') : 'original';
    return this.http.get(imageUrl, {
      responseType: 'blob', params: {
        path,
        dimension
      }
    });
  }


}
