import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { ExternalIds } from 'src/app/interfaces/external-ids.interface';
import { DetailsPageService } from '../../details-page.service';
import { Subscription, Observable, of } from 'rxjs';
import { tap, mapTo, switchMap, map, catchError } from 'rxjs/operators';
import { ContentRating } from 'src/app/interfaces/content-rating.interface';
import { ImdbDetails } from 'src/app/interfaces/imdb-details.interface';
import { Select } from '@ngxs/store';
import { DetailsState } from 'src/app/state/state/details.state';
import { ActivatedRoute } from '@angular/router';
import { MapOperator } from 'rxjs/internal/operators/map';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  parentalGuide: string;
  private subscriptions: Subscription = new Subscription();
  @Select(DetailsState.getDetails) details$: Observable<ShowDetails>;
  @Select(DetailsState.getExternalIds) externalIds$: Observable<ExternalIds>;
  @Select(DetailsState.getImdbDetails) imdbDetails$: Observable<ImdbDetails>;


  constructor(private readonly detailsService: DetailsPageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.pipe(
        map((params) => params.id),
        switchMap((id: string) => this.detailsService.getContentRating(id).pipe(
          tap((result: ContentRating[]) => this.parentalGuide = this.detailsService.getSpecificContentRating(result, 'US')),
          catchError((err) => {
            return of([]);
          })
        ))
      ).subscribe(
        () => { },
        (error) => console.log(error),
      )
    )
  }

  ngOnChanges() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
