import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetails } from '../interfaces/show-details.interface';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { DetailsPageService } from './details-page.service';
import { Person, Credits } from '../interfaces/person.interface';
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
  @Select(DetailsState.getCurrentPage) currentPage$: Observable<DetailsEnum>;


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
  @Emitter(DetailsState.setCurrentPage)
  public currentPage: Emittable<DetailsEnum>;

  private subscriptions: Subscription = new Subscription();
  contentRating: ContentRating[];

  constructor(private route: ActivatedRoute,
    private readonly detailsPageService: DetailsPageService,
    private store: Store) {
  }

  ngOnInit() {
    this.currentPage.emit(DetailsEnum.overview);
    this.subscriptions.add(
      this.route.params.pipe(
        map(params => params.id),
        tap((id: string) => this.id.emit(id)),
        switchMap((id: string) => {
          return this.detailsPageService.getDetails(id).pipe(
            tap((details: ShowDetails) => {
              this.details.emit(details);
              this.posterPath.emit(this.detailsPageService.getPosterPath(details.poster_path));
            }),
            switchMap((details: ShowDetails) => {
              return this.detailsPageService.getCredits(details.id).pipe(
                tap((credits: Credits) => {
                  this.crew.emit(credits.crew);
                  this.cast.emit(credits.cast);
                }),
                switchMap(() => {
                  return this.detailsPageService.getExternalIds(this.store.selectSnapshot(DetailsState.getId)).pipe(
                    tap((result: ExternalIds) => this.externalIds.emit(result)),
                    switchMap((result: ExternalIds) => this.detailsPageService.getImdb(result.imdb_id).pipe(
                      tap((result: ImdbDetails) => this.imdbDetails.emit(result)),
                    )),
                  );
                }),
              )
            }),
          )
        }),
      ).subscribe(),
    );

  }

  ngOnChanges() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  switchPage(page: DetailsEnum) {
    this.currentPage.emit(page);
  }

}
