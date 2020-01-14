import { Injectable } from '@angular/core';
import { TvService } from '../data-layer/tv.service';
import { PersonService } from '../data-layer/person.service';
import { Observable, from } from 'rxjs';
import { ExternalIds } from '../interfaces/external-ids.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { Person, Credits, PersonDetails } from '../interfaces/person.interface';
import { ToastrService } from 'ngx-toastr';
import { ShowDetails } from '../interfaces/show-details.interface';
import { MediaService } from '../data-layer/media.service';
import { BackdropSizesEnum } from '../enums/image-enums';
import { ContentRating } from '../interfaces/content-rating.interface';
import { ImdbDetails } from '../interfaces/imdb-details.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailsPageService {

  constructor(private readonly tvService: TvService, private readonly personService: PersonService,
    private readonly toastService: ToastrService, private readonly mediaService: MediaService) { }

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

  getBackgroundPath(path: string): string {
    return `#002538 url(${this.mediaService.getImagePath(path, BackdropSizesEnum.original)}) no-repeat center center/cover`;
  }

  getPosterPath(path: string): string {
    return `${this.mediaService.getImagePath(path, BackdropSizesEnum.original)}`;
  }

  getContentRating(id: string): Observable<ContentRating[]> {
    return this.tvService.getContentRating(id).pipe(
      map( (response) => response.results),
    )
  }

  getSpecificContentRating(ratings: ContentRating[], country: string): string {
    const found = ratings.find( (rating: ContentRating) => rating.iso_3166_1 === country);
    return found ? found.rating : '-';
  }

  getImdb(id: string): Observable<ImdbDetails> {
    return this.tvService.getImdb(id);
  }
}
