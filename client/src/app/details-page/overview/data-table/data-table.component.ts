import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';
import { ExternalIds } from 'src/app/interfaces/external-ids.interface';
import { DetailsPageService } from '../../details-page.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentRating } from 'src/app/interfaces/content-rating.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() details: ShowDetails;
  externalIds: ExternalIds;
  parentalGuide: string;
  private subscriptions: Subscription = new Subscription();
  constructor(private readonly detailsService: DetailsPageService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.details) {
      this.subscriptions.add( this.detailsService.getExternalIds(this.details.id).pipe(
        tap( (response: ExternalIds) => this.externalIds = response),
      ).subscribe())

      this.subscriptions.add(
        this.detailsService.getContentRating(this.details.id)
          .pipe(
            tap((response: ContentRating[]) => {
              this.parentalGuide = this.detailsService.getSpecificContentRating(response, 'US');
            }),
          )
          .subscribe()
      )
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
