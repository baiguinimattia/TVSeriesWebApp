import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonDetails } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private readonly http: HttpClient) { }

  getDetails(id: string): Observable<PersonDetails> {
    return this.http.get<PersonDetails>(`/api/person/${id}`);
  }
}
