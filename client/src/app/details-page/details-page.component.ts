import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../data-layer/tv.service';
import { ShowDetails } from '../interfaces/show-details.interface';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DetailsPageService } from './details-page.service';
import { PersonDetails } from '../interfaces/person.interface';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {

  id: string;
  details: ShowDetails;
  private subscriptions: Subscription = new Subscription();
  private persons: Observable<PersonDetails>[] = [];


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
      }),
    ).subscribe(
      (response) => {
      },
      (error) => {
        this.toastr.error(error.message);
      }));

    this.subscriptions.add(
      this.detailsPageService.getCredits(this.id).subscribe((response: Observable<PersonDetails>) => this.persons.push(response))
    );


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
