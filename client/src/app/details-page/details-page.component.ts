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


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy, OnChanges {

  @Select(DetailsState.getId) id$: Observable<string>;
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getPosterPath) posterPath$: Observable<string>;

  @Emitter(DetailsState.setId)
  public id: Emittable<string>;
  @Emitter(DetailsState.setDetails)
  public details: Emittable<ShowDetails>;
  @Emitter(DetailsState.setPosterPath)
  public posterPath: Emittable<string>;

  credits: any;
  private subscriptions: Subscription = new Subscription();
  cast: Person[] = [];
  crew: Person[] = [];
  currentPage: DetailsEnum = DetailsEnum.overview;
  contentRating: ContentRating[];

  constructor(private route: ActivatedRoute, private readonly tvService: TvService,
    private readonly toastr: ToastrService,
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
        },
      ),
    );
  }

  // this.subscriptions.add(
  //   this.detailsPageService.getCast(this.id).pipe(
  //     tap((response: Person[]) => this.cast = response),
  //   ).subscribe(),
  // );
  // this.subscriptions.add(
  //   this.detailsPageService.getCrew(this.id).pipe(
  //     tap((response: Person[]) => this.crew = response),
  //   ).subscribe(),
  // );
}

ngOnChanges() {
  if (this.id) {

  }
}

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

switchPage(page: DetailsEnum) {
  this.currentPage = page;
}

}
