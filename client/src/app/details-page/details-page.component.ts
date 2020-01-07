import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../data-layer/tv.service';
import { ShowDetails } from '../interfaces/show-details.interface';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DetailsPageService } from './details-page.service';
import { PersonDetails, Person } from '../interfaces/person.interface';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {

  id: string;
  details: ShowDetails;
  credits: any;
  private subscriptions: Subscription = new Subscription();
  cast: Person[] = [];
  crew: Person[] = [];

  constructor(private route: ActivatedRoute, private readonly tvService: TvService, private readonly toastr: ToastrService,
    private readonly detailsPageService: DetailsPageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.add(
      this.route.params.pipe(
        map(params => params.id),
        tap(id => this.id = id),
      ).subscribe(
        (response) => {
        },
        (error) => {
          this.toastr.error(error.message);
        })
    );

    this.subscriptions.add(this.detailsPageService.getDetails(this.id).pipe(
      tap((result: ShowDetails) => {
        this.details = result;
        console.log(this.details);
      }),
    ).subscribe(
      (response) => {
      },
      (error) => {
        this.toastr.error(error.message);
      }));

    this.subscriptions.add(
      this.detailsPageService.getCast(this.id).pipe(
        tap( (response: Person[]) => this.cast = response),
      ).subscribe(),
    );
    this.subscriptions.add(
      this.detailsPageService.getCrew(this.id).pipe(
        tap( (response: Person[]) => this.crew = response),
      ).subscribe(),
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
