import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../data-layer/tv.service';
import { ShowDetails } from '../interfaces/show-details.interface';
import { tap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {

  id: string;
  details: ShowDetails;
  private subscriptions: Subscription = new Subscription();
  constructor(private route: ActivatedRoute, private readonly tvService: TvService, private readonly toastr: ToastrService) { }

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

    this.subscriptions.add(
      this.tvService.getDetails(this.id).pipe(
        tap((result: ShowDetails) => {
          this.details = result;
        }),
      ).subscribe(
        (response) => {
        },
        (error) => {
          this.toastr.error(error.message);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
