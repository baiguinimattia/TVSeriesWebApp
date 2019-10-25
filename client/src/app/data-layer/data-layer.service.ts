import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  search(title: string): Observable<any> {
    return this.http.get('/api/shows', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authService.getSessionId(),
      }),
      params: { title }
    });
  }

  getShowById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id);
  }

  getShowEpisodesById(id: string): Observable<any> {
    return this.http.get('/api/shows/' + id + '/episodes');
  }
}
