import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowResult } from '../interfaces/show-result.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly http: HttpClient) { }

  searchTv(title: string): Observable<ShowResult[]> {
    return this.http.get<ShowResult[]>('/api/tv/search', {
      params: { query: title }
    });
  }
}
