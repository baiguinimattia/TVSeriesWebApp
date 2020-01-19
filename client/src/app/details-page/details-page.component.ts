import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../data-layer/tv.service';
import { ShowDetails } from '../interfaces/show-details.interface';
import { tap, map, switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DetailsPageService } from './details-page.service';
import { Person } from '../interfaces/person.interface';
import { DetailsEnum } from '../enums/details-enum';
import { ContentRating } from '../interfaces/content-rating.interface';
import { Select, Store } from '@ngxs/store';
import { DetailsState } from '../state/state/details.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ExternalIds } from '../interfaces/external-ids.interface';
import { ImdbDetails } from '../interfaces/imdb-details.interface';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy, OnChanges {

  @Select(DetailsState.getId) id$: Observable<string>;
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getPosterPath) posterPath$: Observable<string>;
  @Select(DetailsState.getCast) cast$: Observable<Person[]>;
  @Select(DetailsState.getCrew) crew$: Observable<Person[]>;
  @Select(DetailsState.getExternalIds) externalIds$: Observable<ExternalIds>;
  @Select(DetailsState.getImdbDetails) imdbDetails$: Observable<ImdbDetails>;


  @Emitter(DetailsState.setId)
  public id: Emittable<string>;
  @Emitter(DetailsState.setDetails)
  public details: Emittable<ShowDetails>;
  @Emitter(DetailsState.setPosterPath)
  public posterPath: Emittable<string>;
  @Emitter(DetailsState.setCrew)
  public crew: Emittable<Person[]>;
  @Emitter(DetailsState.setCast)
  public cast: Emittable<Person[]>;
  @Emitter(DetailsState.setExternalIds)
  public externalIds: Emittable<ExternalIds>;
  @Emitter(DetailsState.setImdbDetails)
  public imdbDetails: Emittable<ImdbDetails>;

  private subscriptions: Subscription = new Subscription();
  currentPage: DetailsEnum = DetailsEnum.overview;
  contentRating: ContentRating[];

  constructor(private route: ActivatedRoute,
    private readonly detailsPageService: DetailsPageService,
    private store: Store) { }

  ngOnInit() {

    this.subscriptions.add(
      this.route.params.pipe(
        map(params => params.id),
        tap((id: string) => this.id.emit(id)),
        switchMap((id: string) => this.detailsPageService.getDetails(id),
        ),
      ).subscribe(
        (details: ShowDetails) => {
          this.details.emit(details);
          this.posterPath.emit(this.detailsPageService.getPosterPath(details.poster_path));

          this.subscriptions.add(
            this.detailsPageService.getCast(details.id).pipe(
            ).subscribe(
              (cast: Person[]) => this.cast.emit(cast),
            ),
          );
          this.subscriptions.add(
            this.detailsPageService.getCrew(details.id).pipe(
            ).subscribe(
              (crew: Person[]) => this.crew.emit(crew),
            ),
          );

          this.subscriptions.add(
            this.detailsPageService.getExternalIds(details.id).pipe(
              tap((ids: ExternalIds) => this.externalIds.emit(ids)),
              map((ids: ExternalIds) => ids.imdb_id),
              switchMap((id: string) => {
                return this.detailsPageService.getImdb(id).pipe(
                  tap((imdbDetails: ImdbDetails) => this.imdbDetails.emit(imdbDetails)),
                );
              })
            ).subscribe(

            ),
          );
        },
      ),
    );


}

ngOnChanges() {
}

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

switchPage(page: DetailsEnum) {
  this.currentPage = page;
}

}
