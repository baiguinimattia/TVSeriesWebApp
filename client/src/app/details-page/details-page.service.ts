import { Injectable } from '@angular/core';
import { TvService } from '../data-layer/tv.service';
import { PersonService } from '../data-layer/person.service';
import { Observable, from } from 'rxjs';
import { ExternalIds } from '../interfaces/external-ids.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { Person, Credits, PersonDetails } from '../interfaces/person.interface';
import { ToastrService } from 'ngx-toastr';
import { ShowDetails } from '../interfaces/show-details.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailsPageService {

  constructor(private readonly tvService: TvService, private readonly personService: PersonService,
    private readonly toastService: ToastrService) { }

  getExternalIds(id: string): Observable<ExternalIds> {
    return this.tvService.getExternalIds(id);
  }

  getPersons(id: string): Observable<Observable<PersonDetails>> {
    return this.tvService.getCredits(id).pipe(
      map((credits: Credits) => credits.cast),
      switchMap((cast: Person[]) => from(cast)),
      map((person: Person) => this.personService.getDetails(person.id)),
    );
  }

  
  getCast(id: string): Observable<Person[]> {
    return this.tvService.getCredits(id).pipe(
      map((credits: Credits) => credits.cast),
    );
  }

  getCrew(id: string): Observable<Person[]> {
    return this.tvService.getCredits(id).pipe(
      map((credits: Credits) => credits.crew),
    );
  }

  getPersonDetails(id: string) {
    return this.personService.getDetails(id);
  }

  getDetails(id: string): Observable<ShowDetails> {
    return this.tvService.getDetails(id).pipe(
    );
  }
}
