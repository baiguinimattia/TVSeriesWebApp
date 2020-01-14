import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Person } from 'src/app/interfaces/person.interface';
import { Subscription } from 'rxjs';
import { DetailsPageService } from '../../details-page.service';
import { tap } from 'rxjs/operators';
import { ShowDetails } from 'src/app/interfaces/show-details.interface';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit, OnDestroy{
  cast: Person[] = [];
  @Input() details: ShowDetails;
  private subscriptions: Subscription = new Subscription();
  constructor(private readonly detailsService: DetailsPageService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.detailsService.getCast(this.details.id).pipe(
        tap((response: Person[]) => this.cast = response),
      ).subscribe(),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
